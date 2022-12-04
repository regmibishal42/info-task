const ProductModel = require('../Models/ProductModel');

const getAllProducts = async() =>{
    return await ProductModel.findAll();
     
};

module.exports = {getAllProducts};