const mysql = require('mysql2');

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'password_manager',
    password: 'toor'
});
module.exports = database.promise()