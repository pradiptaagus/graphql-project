const {Sequelize} = require('sequelize');

const dbConnection = new Sequelize({
    dialect: 'mysql',
    database: 'graphql_project',
    username: 'root',
    password: '',
    host: 'localhost',
    port: '3306',
    underscored: false
});

module.exports = dbConnection;