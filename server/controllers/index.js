var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('getting message');
      if(req.method === 'GET'){
        models.messages.get(function(input) {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(input);
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('posting message');
      if(req.method === 'POST'){
        models.messages.post(req, function(){
          res.writeHead(201);
          res.end();
        });
      } else {
        res.writeHead(400);
        res.end('error posting');
      }
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('getting user');
      if(req.method === 'GET') {
        model.users.get(function(input) {
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(input);
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    },
    post: function (req, res) {
      console.log('posting user');
      if(req.method === 'POST') {
        models.users.post(req, function() {
          res.writeHead(201);
          res.end();
        });
      } else {
        res.writeHead(400);
        res.end('error posting');
      }
    }
  }
}


