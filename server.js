const express = require('express');
const app = express();
const passport = require('passport');

require('dotenv').config();
const databaseConfig = require('./config/db');
const userController = require('./controllers/userController');
const mainCalled = require('./jwtstartegy');

app.use(express.json());
app.use(passport.initialize());
// require('./jwtstartegy')(passport)
mainCalled(passport);

// connect to database
(async()=>{
    try{
        await databaseConfig.authenticate('connected');
        // await databaseConfig.sync({force:true});
        console.log('Connected')
    }
    catch(error){
        console.log('Database Connection Error');
        console.log(error);
    }
})();

console.log(process.env.SECRET_HASH_KEY);
userController(app);
app.get('/check',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.status(200).json({message:'Success'});
});




// app.get('/',(req,res)=>{
//     res.json({message:"Its Working"});
// });

// app.get('/login',(req,res)=>{
//     const {username,password} = req.body;
//     const token = jwt.sign(username,'My_secret_key');
//     res.status(200).json({token});

// });

// app.get('/check-token',(req,res)=>{
//     const token = req.headers.authorization.split(' ')[1];
//     res.send(token);

// }); 




app.use((error,req,res,next)=>{
    return res.status(400).json(error);
})

app.listen(3000,()=>console.log('Server Working on Port 3000'));


// local
// app.post('/login',passport.authenticate('local',{session:false}),(err,req,res)=>{
//     if(err || !user) return res.status(400).json({
//         message:'Sorry cannot Authemticate Your'
//     });
//     req.user = user;
//     // const token = jwt.sign(user,"very_imp_sectet");
//     return res.status(200).json(req.user);

// })

// passport.use(
//     new LocalStrategy((username,password,callback)=>{
//         const found = data.filter(_data=>{
//             if(_data.username === username && _data.password === password) return _data;
//         });
//         if(found.length) return callback(null,found[0],{
//             message:"Login success",
//         });
//         return callback(null,false,{
//             message:'Cannot Authenticate You'
//         });
//     }
//     )
// );
