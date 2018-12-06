var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      connection.connect(function(err) {
        if (err) {
          console.error('Error connecting: ' + err.stack);
          return;
        }

        console.log('Connected as id ' + connection.threadId);
      });

      connection.query('SELECT * FROM messages', function (error, results, fields) {
        if (error){
          throw error;
        }
        console.log(results); //check structure and see if there are any extra procedures needed to convert into JSON string);
        return JSON.stringify(results);
      });
    }, // a function which produces all the messages
    post: function () {
      let body = "";
      req.on('data', (chunk) => {
        body += chunk;
      }).on('end', () => {
        connection.connect(function(err) {
          if (err) {
            console.error('Error connecting: ' + err.stack);
            return (err);
          }
          
          console.log('Connected as id ' + connection.threadId);
        });
        // set insert ID of the roomname and username entry for messages foreign key reference
        var username_id = 0;
        var roomname_id = 0;
        var message = JSON.parse(body);
        //create username entry
        connection.query('INSERT INTO username (name) VALUES (' + message.username + ')' , function(err, result) {
          if (err){
            throw (err);
          }
          console.log('username entry created');
          username_id = result.insertId;
        });
        //create roomname entry
        connection.query('INSERT INTO roomname (name) VALUES (' + message.roomname + ')' , function(err, result) {
          if (err){
            throw(err);
          }
          console.log('roomname entry created');
          roomname_id = result.insertId;
        });
        //create messages entry
        connection.query(`INSERT INTO messages (username_id, roomname_id, text) VALUES (${username_id}, ${roomname_id}, ${message.text})`, function(err, result) {
          if (err){
            throw(err);
          }
          console.log('messages entry created');
        });
        return;
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

