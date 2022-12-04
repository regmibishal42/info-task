const {getAllProducts,newProduct,updateProduct,getProductById} = require('../repository/product-repository');
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

const fetchProductsById = async(req,res,next)=>{
    try {
        const {id} = req.params;
        await productSchema.productId.validateAsync({id});
        const product = await getProductById(id);
        if(product) return res.status(200).json({
            success:true,
            message:'Product Found',
            product
        });
        return res.status(404).json({
            success:false,
            message:`Product With ID ${id} not found`
        });
    } catch (error) {
        console.log('Error While Fetching Products By Id',error);
        next(error);
    }
}

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
};

const updateProductDetails = async(req,res,next) =>{
    try {
        const {name,quantity,price} = req.body;
        const {id} = req.params;
        // to remove undefined fields
        const detailsToUpdate = JSON.parse(JSON.stringify({name,quantity,price}));
        await productSchema.update.validateAsync(detailsToUpdate);
        await updateProduct(detailsToUpdate,id);
        return res.status(200).json({
            success:true,
            message:'Product Updated Successfully',
        });
    } catch (error) {
        console.log('Upadte Product Error',error);
        next(error);
    }
};

const buyProduct = async(req,res,next) =>{
    
}

module.exports = {
    fetchAllProducts,
    createNewProduct,
    updateProductDetails,
    fetchProductsById,
}