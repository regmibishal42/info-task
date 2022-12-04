const express = require('express');
const app = express();
const passport = require('passport');

require('dotenv').config();
const databaseConfig = require('./config/db');
const userController = require('./controllers/userController');
const productsController = require('./controllers/productController');
const mainCalled = require('./jwtstartegy');
mainCalled(passport);
app.use(express.json());
app.use(passport.initialize());
// require('./jwtstartegy')(passport)


// connect to database
(async()=>{
    try{
        await databaseConfig.authenticate('connected');
        await databaseConfig.sync({alter:true});
        console.log('Connected')
    }
    catch(error){
        console.log('Database Connection Error');
        console.log(error);
    }
})();

userController(app);
productsController(app);

app.use((error,req,res,next)=>{
    return res.status(400).json({
        success:false,
        message:"An Error Occured",
        error
    });
})

app.listen(3000,()=>console.log('Server Working on Port 3000'));

