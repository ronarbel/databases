var Parse = {

  server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,

  create: function(message, successCB, errorCB = null) {
<<<<<<< HEAD
=======

>>>>>>> 09ac82e91ed62db67065eef6305cbd8a809e5a36
    $.ajax({
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: successCB,
<<<<<<< HEAD
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to post message', error);
      }
    });
  },
=======
      error: errorCB || function (error) {
        console.error('chatterbox: Failed to create message', error);
      }
    });
      },
>>>>>>> 09ac82e91ed62db67065eef6305cbd8a809e5a36

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};