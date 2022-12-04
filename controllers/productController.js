const {fetchAllProducts,createNewProduct,updateProductDetails, fetchProductsById} = require('../services/product-services');
const protectedMiddleware = require('../utils/protectedMiddleware');

module.exports = (app) =>{
    app.get('/all-products',fetchAllProducts);
    app.get('/product/:id',fetchProductsById)
    app.post('/new-product',createNewProduct);
    app.put('/update-product/:id',updateProductDetails);
}

