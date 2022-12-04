const {DataTypes} = require('sequelize');
const databaseConfig = require('../config/db');

const ProductModel = databaseConfig.define('product',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    name:{
        type:DataTypes.STRING(100),
        allowNull:false,
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
});

module.exports = ProductModel;