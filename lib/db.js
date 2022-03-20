// require('dotenv').config();
const mongoose = require('mongoose');

async function connect(){
    mongoose.connect(process.env.MONGODBCATALOGUE).then(() => console.log('connecté')).catch((e) => console.log(`pas connecté -> ${e.message}`));
}

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    company: String,
    mail: String,
    sector: Number,
    date: { type: Date, default: Date.now() }
});

const UserModel = new mongoose.model('user', userSchema);


async function createUser(User){
    const user = new UserModel(User);
    const result = await user.save();
    return result;
};

async function getAllUsers(){
    const users = await UserModel.find();
    return users;
}

async function getUsersWhere(filter){
    const users = await UserModel.find(filter);
    return users;
}
async function getUserById(id){
    const user = await UserModel.findById(id);
    return user
};




module.exports = {
    UserModel: UserModel,

    connect: connect,
    createUser: createUser,
    getAllUsers: getAllUsers,
    getUsersWhere: getUsersWhere,
    getUserById: getUserById
}