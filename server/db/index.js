var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    database : 'chat',
    user     : 'student',
    password : 'student',
});

exports.connection = connection;
// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


