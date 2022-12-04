const {fetchAllProducts,createNewProduct} = require('../services/product-services');
const protectedMiddleware = require('../utils/protectedMiddleware');

module.exports = (app) =>{
    app.get('/all-products',fetchAllProducts);
    app.post('/new-product',createNewProduct)
}

