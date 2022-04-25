const Sequelize = require('sequelize');
const ck = require('ckey');

const sequelize = new Sequelize(ck.DB_NAME, ck.DB_USER, ck.DB_PASSWORD, {
    dialect: 'mysql'
});

module.exports = sequelize;