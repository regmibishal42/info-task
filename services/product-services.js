const {getAllProducts} = require('../repository/product-repository');


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

module.exports = {
    fetchAllProducts
}