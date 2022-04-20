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

exports.loginUser = (username, password, callback) => {
    console.log(username, password);
    pool.query(`select * from user where username = '${username}' and password = '${password}'`, (err, results) => {
        callback(results.length > 0 ? results[0].id : -1);
    });
}

exports.createStory = (id, name, title, body, callback) => {
    console.log('creating storyryyyy');
    const dateTime = new Date();
    console.log(dateTime, id, name, title, body);
    pool.query(`insert into story (uploader, author, title, content, create_time, update_time) values (${id}, '${name}', '${title}', '${body}', '${dateTime}', '${dateTime}')`, (err, results) => {
        if(err) throw err;
        callback(results);
    });
}

exports.updateStory = (id, title, body, callback) => {
    const dateTime = new Date();
    pool.query(`UPDATE story SET title = '${title}', content ='${body}', update_time='${dateTime}' WHERE id = ${id};`, (err, results) => {
        if(err) throw err;
        callback(results);
    });
}

exports.updateProfile = (name, email, password, id, callback) => {
    const dateTime = new Date();
    pool.query(`UPDATE user SET name = '${name}', email ='${email}', password='${password}' WHERE id = ${id};`, (err, results) => {
        if(err) throw err;
        callback(results);
    });
}


exports.removeStory = (id, callback) => {
    pool.query(`DELETE FROM story WHERE id=${id}`, (err, results) => {
        if(err) throw err;
        callback(results);
    });
}


exports.fetchStory = (callback) => {
    console.log('getting story from db');
    pool.query(`select * from story`, (err, results) => {
        if(err) throw err;
        callback(results);
        console.log(results);
    });
}

exports.fetchStoryFrom = (id, callback) => {
    pool.query(`select * from story where uploader =${id}`, (err, results) => {
        if(err) throw err;
        callback(results);
        console.log(results);
    });
}

exports.fetchProfile = (id, callback) => {
    console.log("fetchProfile: ",id);
    pool.query(`select * from user where id =${id}`, (err, results) => {
        if(err) throw err;
        callback(results[0]);
        console.log(results);
    });
}