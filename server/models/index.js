var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      var messageArr = [];
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
        results.forEach(result => {
        messageArr.push(result);
        console.log(result); //check structure and see if there are any extra procedures needed to convert into JSON string
      });
    });
 //convert to sql js syntax
      //parse into actual message objects
    }, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

