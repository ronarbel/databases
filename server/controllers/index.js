var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('getting message');
      if(req.method === 'GET'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(models.messages.get());
      } else {
        res.writeHead(404);
        res.end();
      }
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('posting message');
      if(req.method === 'POST'){
        var result = models.messages.post(req);
        if (!result){
          res.writeHead(201);
          res.end();
        } else {
        //should return error or success case
          res.writeHead(400);
          res.end(result);
        }
      }
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('getting user');
      if(req.method === 'GET') {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(models.users.get());
      } else {
        res.writeHead(404);
        res.end();
      }
    },
    post: function (req, res) {
      console.log('posting user');
      if(req.method === 'POST') {
        var result = models.users.post(req);
        if (!result) {
          res.writeHead(201);
          res.end();
        } else {
          res.writeHead(400);
          res.end(result);
        }
      }
    }
  }
};


