const db = require('./lib/db');
const express = require('express');
const bodyParser = require('body-parser');
const req = require('express/lib/request');
const User = require('./lib/classes/User');


const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
let jsonParser = bodyParser.json();

app.get('/users', async (req, res) => {

    try{
        const user = await User.getAll();
        res.send(user);
    }
    catch(e){
        res.status(500).send('une erreur interne est survenue, merci de réessayer plus tard');
        console.log(e.message);
    }
})

app.post('/', async (req, res) => {

    
    let status = 200;
    let errors = [];
    if(req.body.firstname.length < 2){ status = 400; errors.push({firstname: 'Merci de spécifier au moins 2 caractères'}) };
    if(req.body.firstname.length === 0){ status = 400; errors.push({firstname: 'Merci de renseigner votre prénom'}) };

    if(req.body.lastname.length === 0){ status = 400; errors.push({lastname: 'Merci de renseigner votre nom'}) };


    // Final Result 
    if(errors.length > 0) {
        res.status(status).send(errors);
    } 
    else if(errors.length === 0) {
        const user = new User(req.body);
        const save = await user.create();
        res.status(status).send(save);
    };

})

const port = 3000;
app.listen(port, () => console.log('listen port : ' + port));