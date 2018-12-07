var Promise = require('bluebird');
var db = require('../db');
var _ = require('underscore');

module.exports = {
  messages: {
    get: function (callback) {
      db.connection.query('SELECT * FROM messages', function (error, results, fields) {
        if (error){
          throw error;
        }
        console.log(results); //check structure and see if there are any extra procedures needed to convert into JSON string);
        callback(JSON.stringify(results));
      });
    }, // a function which produces all the messages
    post: function (req, callback) {
      // create username
      var usernamePromise = new Promise((resolve, reject) => {
        db.connection.query(("SELECT * FROM username WHERE username = " + db.connection.escape(req.body.username)), function(error, results, fields) {
          if (error) {
            reject(error);
          }
          var promiseVal = {};
          var exists = false;
          Object.keys(results).forEach((key) => {
            if(results[key].username === req.body.username){
              console.log('username exists');
              exists = true;
              promiseVal.usernameId = results[key].id;
              resolve(promiseVal.usernameId);
            }  
          });
          if (!exists) {
            db.connection.query("INSERT INTO username (username) VALUE (" + db.connection.escape(req.body.username) + ")", function (error, results) {
              if (error) {
                throw (error);
              }
              console.log('posting user now');
              promiseVal.usernameId = results.insertId;
              resolve(promiseVal.usernameId);
            });
          }
        });
      });
      
      // create roomname
      var roomnamePromise = new Promise((resolve, reject) => {
        db.connection.query("SELECT * FROM rooms WHERE roomname = " + db.connection.escape(req.body.roomname), function(error, results) {
          if (error) {
            reject(error);
          }
          var promiseVal = {};
          var exists = false;
          Object.keys(results).forEach((key) => {
            if(results[key].roomname === req.body.roomname){
              console.log('roomname exists');
              exists = true;
              promiseVal.roomnameId = results[key].id;
              console.log("post roomname key fetch " + results[key].id);
              resolve(promiseVal.roomnameId);
            }  
          });
          if (!exists) {
            db.connection.query("INSERT INTO rooms (roomname) VALUE (" + db.connection.escape(req.body.roomname) + ")", function (error, results) {
              if (error) {
                throw (error);
              }
              console.log('posting user now');
              promiseVal.roomnameId = results.insertId;
              console.log("post roomname key POST " + results.insertId);
              resolve(promiseVal.roomnameId);
            });
          }
        });
      });
      
      // create message
      return Promise.all([usernamePromise, roomnamePromise]).then((args) => {
        db.connection.query(`INSERT INTO messages (username_id, roomname_id, text) VALUE (${args[0]}, ${args[1]}, ${db.connection.escape(req.body.message)})`, function (error, results) {
          if (error) {
            console.log(error);
            throw (error);
          }
          callback(); 
        });
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      db.connection.query('SELECT * FROM username', function (error, results, fields) {
        if (error){
          throw (error);
        }
        console.log(results);
        callback(JSON.stringify(results));
      });
    },
    post: function (req, callback) {      
      db.connection.query(("SELECT username FROM username WHERE username = " + db.connection.escape(req.body.username)), function(error, results, fields) {
        if (error) {
          throw (error);
        }
        var exists = false;
        Object.keys(results).forEach((key) => {
          if(results[key].username === req.body.username){
            console.log('username exists');
            exists = true;
          }  
        });
        if (!exists) {
          db.connection.query("INSERT INTO username (username) VALUE (" + db.connection.escape(req.body.username) + ")", function (error, results) {
            if (error) {
              throw (error);
            }
            console.log('posting user now');
          });
        }
      });
      callback();
    }
  }
}

