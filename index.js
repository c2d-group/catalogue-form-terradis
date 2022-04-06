const db = require('./lib/db');
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./lib/classes/User');
const exportcsv = require('./lib/exportcsv');
const notion = require('./lib/notion');
// const sendInBlue = require('./lib/sendInBlue');


const app = express();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
let jsonParser = bodyParser.json();

// app.get('/api/users', async (req, res) => {
//     try{
//         const user = await User.getAll();
//         res.send(user);
//     }
//     catch(e){
//         res.status(500).send('une erreur interne est survenue, merci de réessayer plus tard');
//         console.log(e.message);
//     }
// })

// // Remove one of the download routes
//
// app.get('/api/users/updateExport', async (req, res) => {
//     const redirectionUrl = 'https://www.web-terradis.fr/produits-liens/';
//     exportcsv.exportUsers()
//     .then((response) => setTimeout(() => res.redirect(redirectionUrl), 1000))
//     .catch((e) => {
//         const message = `Une erreur est survenue lors de la mise à jour de la liste des utilisateurs -> ${e.message}`;
//         res.status(500).send(message);
//         console.log(message);
//         setTimeout(() => res.redirect(redirectionUrl), 2500);
//     });
// })

app.post('/saveUser/', async (req, res) => {

    
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
        const newNotionUser = await notion.addUser(user);
        // const newSibContact = await sendInBlue.createContact(user);

        if(process.env.mode === "DEV"){
            res.send(req.body)
        } else {
            res.status(status).redirect('http://www.web-terradis.fr/produits-liens');
        }

        try{
            const exportUser = await exportcsv.exportUsers();
            console.log('Mise à jour du fichier utilisateur effectuée.');
        }
        catch(e){ console.log(e.message); }
    };

})

const port = 3000;
app.listen(3000, () => console.log('listen port : ' + 3000));