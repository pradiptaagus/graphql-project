const {v4: uuidv4} = require('uuid');
const { DataTypes } = require("sequelize");
const dbConnection = require("../dbConnection");

const User = dbConnection.define('User', {
    id: {
        type: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
});

User.beforeCreate((user) => {
    return user.id = uuidv4();
});

module.exports = User;