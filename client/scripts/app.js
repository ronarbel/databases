var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
    
    setInterval(App.fetch(MessagesView.renderMessage) , 3000);


    // Poll for new messages every 3 sec
    setInterval(App.fetch, 3000);
      },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
<<<<<<< HEAD
      // examine the response from the server request
      var checker = 0;
      for (var i = 0; i < data.results.length; i++) {
        if (!data.results[i]['roomname']) {
          data.results[i]['roomname'] = 'lobby';
        }
        if (!data.results[i]['username']) {
          data.results[i]['username'] = 'dingus';
        }
        if (!data.results[i]['text']) {
          data.results[i]['text'] = 'hello, this is dog.';
        }
        data.results[i]['username'].replace(/ /g, '');
        // data.results[i]['roomname'].replace(/ /g, '');
        Messages._Data[data.results[i].objectId] = data.results[i];
        MessagesView.renderMessage(Messages._Data[data.results[i].objectId]);
        MessagesView.roomList[Messages._Data[data.results[i].objectId]] = 1;
      } 
      for (key in MessagesView.roomList) {
        $('#rooms select').append(Rooms.render({roomname: key}));
        if (key === 'lobby') {
          checker = 1;
        }
      }
      if (!checker) {
        $('#rooms select').append(Rooms.render({roomname: 'lobby'}));
      }
=======

      // Don't bother to update if we have no messages
      if (!data.results || !data.results.length) { return; }

      Rooms.update(data.results, RoomsView.render);
      Messages.update(data.results, MessagesView.render);
      
>>>>>>> 09ac82e91ed62db67065eef6305cbd8a809e5a36
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};
