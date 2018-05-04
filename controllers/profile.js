
//use the params (GET) to find the respective user from their ID
const handleProfileGet = (req, res, db, bcrypt) => {
    const { id } = req.params;

    db.select('*').from('users').where({
        id: id
    }).then(user => {
        if (user.length) {
            res.json(user[0])
        }
        else {
            res.status(400).json('Error getting user')
        }
    }).catch(err => res.status(400).json('Not Found'))
}

module.exports = {
    handleProfileGet: handleProfileGet
}