// require('dotenv').config();

const {Client} = require('@notionhq/client');

const notion = new Client({
    auth: process.env.API_TOKEN
})

async function addUser(user){
    try{
        const response = await notion.pages.create({
            parent: { database_id: process.env.NOTIONDB},
            properties: {
                 "Nom": {
                     "title": [
                         {
                             "text": {
                                 "content": user.lastname
                             }
                         }
                     ]
                },
                "Prénom": {
                     "rich_text": [
                         {
                             "text": {
                                 "content": user.firstname
                             }
                         }
                     ]
                },
                "Entreprise": {
                    "rich_text": [
                        {
                            "text": {
                                "content": user.company
                            }
                        }
                    ]
                },
                "Email": {
                     "email": user.mail
                },
                "Téléphone": {
                     "phone_number": user.phone
                },
                "Secteur": {
                     "select": {
                         "name": user.sector
                     }
                }

             }

        })

        console.log(`${user} correctly inserted in Notion`);

    }
    catch(e){
        console.log(`Error while trying to insert new user in Notion : e.body`);
    }
}

module.exports = {
    addUser: addUser
}