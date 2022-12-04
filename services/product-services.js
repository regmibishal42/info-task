const {getAllProducts,newProduct} = require('../repository/product-repository');
const productSchema = require('../validators/product-validator');


const fetchAllProducts = async(req,res,next) =>{
    try{
        const products = await getAllProducts();
        res.status(200).json({
            success:true,
            products,
        });
    }
    catch(error){
        console.log('Fucking Error Occured',error);
        next(error);
    }
};

const createNewProduct = async(req,res,next) =>{
    try {
        const {name,price,quantity} = req.body;
        console.log(name,price,quantity)
        await productSchema.create.validateAsync({name,price,quantity});
        const product = await newProduct({name,price,quantity});
        console.log('Product Created Successfully');
        return res.status(200).json({
            success:true,
            message:'Product Created Successfully',
            product
       })
    } catch (error) {
        console.log('Fucking Error Occured',error);
        next(error) 
       
    }
}

module.exports = {
    fetchAllProducts,
    createNewProduct
}