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
        models.messages.post(req, function(){
          res.writeHead(201);
          res.end();
        });
      }
      //   return new Promise((resolve, reject) => {
      //     if(error){
      //       reject(error);
      //     }
      //     var intermediate = resolve(models.messages.post(req, res));
      //     console.log("intermediate", intermediate);
      //   })
      //   .then((postResult) => {
      //     console.log(postResult);
      //     if (postResult.affectedRows) {
      //       res.writeHead(201);
      //       res.end();
      //     } else {
      //       res.writeHead(400);
      //       res.end('error posting message');
      //     }
      //   }); 
      // }
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
        models.users.post(req, function() {
          res.writeHead(201);
          res.end();
        });
      }
    }
  }
}


