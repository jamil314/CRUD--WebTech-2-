const {createPool} = require('mysql');
const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'easypass123',
    database: 'CRUD'
});

pool.query(`select * from user`, (err, results) => {
    if(err) throw err;
    console.log(results);
});

exports.userExists = (username, callback) => {
    pool.query(`select * from user where username = '${username}'`, (err, results) => {
        if(err) throw err;
        callback(results.length > 0);
    });
}

exports.registerUser = (name, email, username, password, callback) => {
    pool.query(`insert into user (name, email, username, password) values ('${name}', '${email}', '${username}', '${password}')`, (err, results) => {
        if(err) throw err;
        callback(null, results);
    });
}