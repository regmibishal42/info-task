const ProductModel = require('../Models/ProductModel');

const getAllProducts = async() =>{
    return await ProductModel.findAll();
     
};
const getProductById = async(id) =>{
    return await ProductModel.findByPk(id);
}

const newProduct = async(product) =>{
    return await ProductModel.create(product);
};

const updateProduct = async(product,id) =>{
    return await ProductModel.update(product,{where:{id}});
}


module.exports = {getAllProducts,newProduct,updateProduct,getProductById};