const { getAllUsers,
    createNewUser,
    login,
    deleteUser,protectedUserRoute} = require('../services/user-service');

module.exports = (app) =>{
    app.get('/all-users',getAllUsers);
    app.post('/new-user',createNewUser);
    app.post('/login',login);
    app.delete('/user/:id',deleteUser);
    app.get('/admin',protectedUserRoute);
}