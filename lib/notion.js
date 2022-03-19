require('dotenv').config();
const {client, Client} = require('@notionhq/client');

const notion = new Client({
    auth: process.env.API_TOKEN
})

async function addUser(firstname,lastname, company, email, sector){
    try{

        const response = await notion.pages.create({
            parent: { database_id: process.env.NOTIONDB},
            properties: {
                "Nom": {
                    title: [
                        {
                            "text": {
                                "content": firstname
                            }
                        }
                    ]
                },
                "Prénom": {
                    rich_text: [
                        {
                            "text": {
                                "content": lastname
                            }
                        }
                    ]
                },
                "Entreprise": {
                    rich_text: [
                        {
                            "text": {
                                "content": company
                            }
                        }
                    ]
                },
                "Email": {
                    "email": email
                },
                "Secteur": {
                    "select": {
                        name: sector
                    }
                }  
            }
        })

        console.log('success');

    }
    catch(e){
        console.log(e.body)
    }
}

module.exports = {
    addUser: addUser
}