var Promise = require('bluebird');
var db = require('../db');
var _ = require('underscore');

module.exports = {
  messages: {
    get: function () {
      db.connection.query('SELECT * FROM messages', function (error, results, fields) {
        if (error){
          throw error;
        }
        console.log(results); //check structure and see if there are any extra procedures needed to convert into JSON string);
        return JSON.stringify(results);
      });
    }, // a function which produces all the messages
    post: function (req) {
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
              console.log("post username key fetch " + promiseVal.usernameId);
            }  
          });
          if (!exists) {
            db.connection.query("INSERT INTO username (username) VALUE (" + db.connection.escape(req.body.username) + ")", function (error, results) {
              if (error) {
                throw (error);
              }
              console.log('posting user now');
              promiseVal.usernameId = results.insertId;
              console.log("post username key POST " + results.insertId);
            });
          }
          resolve(promiseVal.usernameId);
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
            }  
          });
          if (!exists) {
            db.connection.query("INSERT INTO username (username) VALUE (" + db.connection.escape(req.body.username) + ")", function (error, results) {
              if (error) {
                throw (error);
              }
              console.log('posting user now');
              promiseVal.roomnameId = results.insertId;
              console.log("post roomname key POST " + results.insertId);
            });
          }
          resolve(promiseVal.roomnameId);
        });
      });
      
      // create message
      return Promise.all([usernamePromise, roomnamePromise]).then((args) => {
        db.connection.query(`INSERT INTO messages (username_id, roomname_id, text) VALUE (${args[0]}, ${args[1]}, ${db.connection.escape(req.body.message)})`, function (error, results) {
          if (error) {
            console.log(error);
            throw (error);
          }
          console.log(results);
          return results; // --> expect to be OKPacket
        });
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function () {
      db.connection.query('SELECT * FROM username', function (error, results, fields) {
        if (error){
          throw (error);
        }
        console.log(results);
        return JSON.stringify(results);
      });
    },
    post: function (req) {      
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
      return;
    }
  }
}

