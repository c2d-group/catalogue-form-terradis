const db = require('./db');
const utils = require('./utils');
const fs = require('fs');


async function getUsersInfos(){

    const connect = await db.connect();
    const usersDb = await db.getAllUsers();
    const users = []

    for(user of usersDb){
        const firstname = utils.capitalizeString(user.firstname);
        const lastname = utils.capitalizeString(user.lastname);
        const dateObj = new Date(user.date);
        const date = `${dateObj.toLocaleDateString()} - ${dateObj.toLocaleTimeString()}`
        let infos = `${firstname};${lastname};${user.company};${user.mail};${user.sector};${date}`;
        users.push(infos);
    }

    const result =  users.join('\n');
    return result

}

async function exportUsers(){
    getUsersInfos()
    .then((res) => {
        const file = fs.writeFileSync(`${__dirname}/../export-telechargements.csv`, res, {encoding: 'latin1'});
        return {
            status: 1,
            message: 'Téléchargement effectué'
        }
    })
    .catch((e) => {
        return e.message
    })
}

module.exports = {
    getUsersInfos: getUsersInfos,
    exportUsers: exportUsers,
}