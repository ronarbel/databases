var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('getting');
      if(req.type === 'GET'){
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(models.messages.get());
      }
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('posting');
      if(req.type === 'POST'){
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
      console.log('userget');
    },
    post: function (req, res) {
      console.log('userpost');
    }
  }
};


