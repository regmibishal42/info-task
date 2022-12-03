const {Sequelize} = require('sequelize');

const databaseConfig = new Sequelize({
    database:'task',
    username:'postgres',
    password:'admin',
    port:5432,
    host:'localhost',
    dialect:'postgres',
    logging:false,
});



module.exports = databaseConfig;