const db = require('./db');
const fs = require('fs');

async function testCreateUser () {

    const connect = await db.connect();

    const user = {
        fisrtname: 'Clément',
        lastname: 'Deryckx',
        company: 'C2D',
        mail: 'deryckxclement@gmail.com'
    };


    const save = await db.createUser(user);

    console.log(save);

};





module.exports = {
    testCreateUser: testCreateUser,
}