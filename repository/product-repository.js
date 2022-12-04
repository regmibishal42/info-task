const ProductModel = require('../Models/ProductModel');

const getAllProducts = async() =>{
    return await ProductModel.findAll();
     
};

const newProduct = async(product) =>{
    return await ProductModel.create(product);
}

module.exports = {getAllProducts,newProduct};