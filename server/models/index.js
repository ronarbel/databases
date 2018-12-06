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
      console.log(req.body);
        // set insert ID of the roomname and username entry for messages foreign key reference
      var usernameId;
      var roomnameId;
      // check if username exists, if yes, gab id, if not, insert and grab id
      db.connection.query(("SELECT * FROM username WHERE username = " + db.connection.escape(req.body.username)), function(error, results, fields) {
          if (error) {
            throw (error);
          }
          var exists = false;
          Object.keys(results).forEach((key) => {
            if(results[key].username === req.body.username){
              console.log('username exists');
              exists = true;
              usernameId = results[key].id;
              console.log("post username key fetch " + results[key].id);
            }  
          });
          if (!exists) {
            db.connection.query("INSERT INTO username (username) VALUE (" + db.connection.escape(req.body.username) + ")", function (error, results) {
              if (error) {
                throw (error);
              }
              console.log('posting user now');
              usernameId = results.insertId;
              console.log("post username key POST " + results.insertId);
            });
          }
        });
      
       // check if roomname exists, if yes, gab id, if not, insert and grab id
      db.connection.query(("SELECT * FROM rooms WHERE roomname = " + db.connection.escape(req.body.roomname)), function(error, results, fields) {
          if (error) {
            throw (error);
          }
          var exists = false;
          Object.keys(results).forEach((key) => {
            if(results[key].roomname === req.body.roomname){
              console.log('roomname exists');
              exists = true;
              roomnameId = results[key].id;
              console.log("post roomname key fetch " + results[key].id, "roomnameID: " + roomnameId);
            }  
          });
          if (!exists) {
            db.connection.query("INSERT INTO rooms (roomname) VALUE (" + db.connection.escape(req.body.roomname) + ")", function (error, results) {
              if (error) {
                throw (error);
              }
              console.log('posting room now');
              roomnameId = results.insertId;
              console.log("post roomname key POST " + results.insertId);
            });
          }
        });
      
      // ********ASYNC PROBLEM: defining args before connection is complete above********
      console.log("After query roomnameId: " + roomnameId);
        //create messages entry
        var args = [usernameId, roomnameId, db.connection.escape(req.body.message)]
        console.log(args[0], args[0]);
        console.log(usernameId, roomnameId);
        console.log('args: ' + args);
        db.connection.query(`INSERT INTO messages (username_id, roomname_id, text) VALUES (${args})`, function(err, result) {
          if (err){
            throw(err);
          }
          console.log('CREATE message args: ' + args);
          console.log('messages entry created');
          console.log('POST MESSAGE RESULT: ' + result);
        });
        return;
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

