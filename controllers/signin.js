
const handleSignin = (db, bcrypt) => (req, res) => {

    // Destructure body
    const { email, password } = req.body;

    //Validate entry for email and password
    if (!email || !password) {
        return res.status(400).json('Incorrect Form Submission');
    }

    // Search for email in login table, then use bcrypt to compare password with the hash
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcrypt.compareSync(password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to get user'))
            }
            else {
                res.status(400).json('Wrong Credentials')
            }

        })
        .catch(err => res.status(400).json('Wrong Credentials'))
}

module.exports = {
    handleSignin: handleSignin
}