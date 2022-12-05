const { getAllUsers,
    createNewUser,
    login,
    deleteUser,protectedUserRoute} = require('../services/user-service');
const protectedMiddleware = require('../utils/protectedMiddleware');

module.exports = (app) =>{
    app.get('/all-users',protectedMiddleware,getAllUsers);
    app.post('/new-user',createNewUser);
    app.post('/login',login);
    app.delete('/user/:id',protectedMiddleware,deleteUser);
    // app.get('/admin',protectedMiddleware,protectedUserRoute);
}