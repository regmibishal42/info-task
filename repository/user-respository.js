const UserModel = require('../Models/UserModel');

const fetchAllUsers = async()=>{
    return await UserModel.findAll();
}

const createUser = async(data)=>{
    return await UserModel.create(data);
}
const loginUser = async(username) =>{
    return await UserModel.findOne({where:{username:username}});
}

const deleteUserById = async(id) => await UserModel.destroy({id});

const findUserById = async(id) =>{
    return await UserModel.findByPk(id);
}

module.exports = {
    fetchAllUsers,
    createUser,
    deleteUserById,
    loginUser,
    findUserById
}