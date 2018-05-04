// Register the user based on the email, name and password
const handleRegister = (req, res, db, bcrypt) => {
    // Destructure body
    const { email, name, password } = req.body;

    // Validate entry so there are no blanks
    if(!email || !name || !password ){
       return res.status(400).json('Incorrect Form Submission');
    }

    // Bcrypt function to convert password to hash
    const hash = bcrypt.hashSync(password);

    // KNEX transaction to ensure the entire email, name and password are entered 
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    }).then(user => {
                        res.json(user[0])
                    })

            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('Unable to Register'))
}

module.exports = {
    handleRegister: handleRegister
}