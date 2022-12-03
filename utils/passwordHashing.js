const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) =>{
    return await bcrypt.hash(password,saltRounds);
}

const comparePasswords = async ({enteredPassword,actualPassword}) =>{
    console.log('Entered Password:',enteredPassword);
    console.log('Actual user Password',actualPassword);
    return await bcrypt.compare(enteredPassword,actualPassword);
};

module.exports = {
    hashPassword,
    comparePasswords
}