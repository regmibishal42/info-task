const {fetchAllProducts} = require('../services/product-services');

module.exports = (app) =>{
    app.get('/all-products',fetchAllProducts);
}

