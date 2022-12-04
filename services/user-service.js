const { fetchAllUsers,
    createUser,
    deleteUserById,
    loginUser } = require('../repository/user-respository');
const userSchema = require('../validators/user-validator');
const {hashPassword, comparePasswords} = require('../utils/passwordHashing');
const jwt = require('jsonwebtoken');

const getAllUsers = async(req,res,next)=>{
    try{
        const users = await fetchAllUsers();
        return res.status(200).json(users);
    }catch(error){
        console.log('Fucking Error Occured',error);
        next(error);
    }
};

const createNewUser = async(req,res,next) =>{
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
    catch(error){
        console.log('Fucking Error Occured',error);
        next(error);
    }
};

const login = async(req,res,next) =>{
    try{
        
        const {username,password} = req.body;
        const user = await loginUser(username);
        const isMatch = await comparePasswords({enteredPassword:password,actualPassword:user.password});
        console.log('is match',isMatch);
        if(isMatch){
            const token = jwt.sign({
                iss: username,
                sub: user.id,
              }, process.env.SECRET_HASH_KEY);
              return res.status(200).json(token);
        }
        res.status(400).json({
            message:'Login Failed'
        })
    }
    catch(error){
        console.log('Fucking Error Occured',error);
        next(error);
    }
}

const deleteUser = async(req,res,next) =>{
    try{
        const {id} = req.params;
        await userSchema.checkParams.validateAsync({id});
        const response = await deleteUserById(id);
        return res.status(200).json(response)
    }
    catch(error){
        console.log('Fucking Error Occured',error);
        next(error);
    }
};

const protectedUserRoute = async(req,res) =>{
    res.status(200).json({
        message:'Accessed By Logged In User',
        user:req.user? req.user : 'User Not Found'
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    login,
    deleteUser,
    protectedUserRoute
}