const { fetchAllUsers,
    createUser,
    deleteUserById,
    loginUser } = require('../repository/user-respository');
const userSchema = require('../validators/user-validator');
const {hashPassword, comparePasswords} = require('../utils/passwordHashing');
const jwt = require('jsonwebtoken');

const getAllUsers = async(req,res)=>{
    try{
        const users = await fetchAllUsers();
        return res.status(200).json(users);
    }catch(e){
        throw e;
    }
};

const createNewUser = async(req,res) =>{
    try{
        const {username,password} = req.body;
        await userSchema.create.validateAsync({
            username,password
        });
        console.log(typeof hashPassword === 'function');
        console.log(typeof hashPassword);
        const hasedPassword = await hashPassword(password);
        console.log('Hashed Password',hasedPassword);
        const user = await createUser({username,password:hasedPassword});
        res.status(200).json(user);
    }
    catch(err){
        throw err;
    }
};

const login = async(req,res) =>{
    try{
        
        const {username,password} = req.body;
        const user = await loginUser(username);
        const isMatch = await comparePasswords({enteredPassword:password,actualPassword:user.password});
        console.log('is match',isMatch);
        if(isMatch){
            const token = jwt.sign({
                iss: username,
                sub: user.id,
                iat: new Date().getTime(),
                exp: new Date().setDate(new Date().getDate() + 1)
              }, process.env.SECRET_HASH_KEY);
              return res.status(200).json(token);
        }
        res.status(400).json({
            message:'Login Failed'
        })
    }
    catch(e){
        throw e;
    }
}

const deleteUser = async(req,res) =>{
    try{
        const {id} = req.params;
        await userSchema.checkParams.validateAsync({id});
        const response = await deleteUserById(id);
        return res.status(200).json(response)
    }
    catch(e){
        throw(e);
    }
};

const protectedUserRoute = async(req,res) =>{
    res.status(200).json({
        message:'Accessed By Logged In User'
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    login,
    deleteUser,
    protectedUserRoute
}