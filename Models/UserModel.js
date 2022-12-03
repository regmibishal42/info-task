const {DataTypes} = require('sequelize');
const databaseConfig = require('../config/db');

const UserModel = databaseConfig.define('user',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    username:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING(200),
        allowNull:false
    },
});


module.exports = UserModel;