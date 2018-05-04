const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// Establish connection to DB
const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'Aranda123',
        database: 'smart-brain'
    }
});

// Express to establish connection to database
const app = express();

//Parse JSON
app.use(bodyParser.json());

// CORS to avoid same origin errors
app.use(cors());

// Generic GET
app.get('/', (req, res) => {
    res.send(database.users);
})


// RESTFUL API calls to handle the requests to the database
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db, bcrypt) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) })


// Express listen on port 3000
app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on on port ${process.env.PORT}`);
})
