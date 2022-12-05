const {fetchAllProducts,createNewProduct,updateProductDetails, fetchProductsById,buyProduct} = require('../services/product-services');
const protectedMiddleware = require('../utils/protectedMiddleware');

module.exports = (app) =>{
    app.get('/all-products',fetchAllProducts);
    app.get('/product/:id',fetchProductsById)
    app.post('/new-product',protectedMiddleware,createNewProduct);
    app.put('/update-product/:id',protectedMiddleware,updateProductDetails);
    app.post('/buy-product',protectedMiddleware,buyProduct);
}

