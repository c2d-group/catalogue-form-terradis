const db = require('./../db');

class User {

    constructor(user){

        if(user.firstname) this.firstname = user.firstname;
        if(user.lastname) this.lastname = user.lastname;
        if(user.company) this.company = user.company;
        if(user.mail) this.mail = user.mail;
        if(user.sector) this.sector = user.sector;


    }

    async create(){
        const connect = await db.connect();
        const createduser = await db.createUser(this);
        return createduser;
    };

    static async getAll(){
        const connect = await db.connect();
        const users = await db.getAllUsers();
        return users;
    }

    async getWhere(filter){
        const connect = await db.connect();
        const users = await db.getUsersWhere(filter);
        return users;
    }

    async getById(id){
        const connsect = await db.connect();
        const user = await db.getUserById(id);
        return user
    }



}

module.exports = User;