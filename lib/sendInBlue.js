const SibApiV3Sdk = require('sib-api-v3-sdk');
require('dotenv').config();
let defaultClient = SibApiV3Sdk.ApiClient.instance;

let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_TOKEN;


// N'enregistre que si le contact n'existe pas ailleurs sur le compte
async function createContact(contact){

    let apiInstance = new SibApiV3Sdk.ContactsApi();

    let createContact = new SibApiV3Sdk.CreateContact();
    
    createContact.email = contact.body.mail;
    createContact.attributes = {
        "NOM": contact.body.firstname,
        "PRENOM": contact.body.lastname,
        "ENTREPRISE": contact.body.company,
        "DEPARTEMENT": contact.body.sector,
        "OPT_IN": true
    }
    createContact.listIds = [44];
    
    apiInstance.createContact(createContact)
    .then(function(data){
        console.log('Contact crée dans SendinBlue -> ' + JSON.stringify(data));
    }, function(err){
        console.log('Les Contact est déja présent dans la base de données sendinblue');
    })

}


module.exports = {
    createContact: createContact
}