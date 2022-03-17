const db = require('./db');

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