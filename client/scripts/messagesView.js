var MessagesView = {

  $chats: $('#chats'),
  roomList: {},
  initialize: function(message) {
    $.ajax({
      url: MessageView.server,
      type: 'GET',
      data: message,
      contentType: 'application/json', //get entire array
      success: function(data) {
        var copy = _.clone(MessagesView.roomList);
        var len = Object.keys(copy).length;
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
          Messages._Data[data.results[i].objectId] = data.results[i];
          MessagesView.renderMessage(Messages._Data[data.results[i].objectId]);
          MessagesView.roomList[Messages._Data[data.results[i].objectId]['roomname']] = 1;
        }
        if (Object.keys(MessagesView.roomList).length - len) {
          for (key in MessagesView.roomList) {
            if (copy[key] === undefined) {
              $('#rooms select').append(Rooms.render({roomname: key}));
            }
          }
        }
      },
      error: function(data) {
        console.error('chatterbox: Failed to parse message', data);
      },
    });

<<<<<<< HEAD
    
  },

  renderMessage: function(data) {
    var rendered = MessageView.render(data);
    $('#chats').prepend(rendered);
    $('.username').on('click', function(txt) {
      var clickedUser = $(txt.target).text().trim();
      Friends.toggleStatus(clickedUser); 
    }); 
  }
=======
  initialize: function() {

    MessagesView.$chats.on('click', '.username', MessagesView.handleClick);
      },

  render: function() {

    MessagesView.$chats.html('');
    Messages
      .items()
      .filter(message => Rooms.isSelected(message.roomname))
      .each(message => MessagesView.renderMessage(message));
  },

  renderMessage: function(message) {
    var $message = MessageView.render(message);
    MessagesView.$chats.prepend($message);
  },

  handleClick: function(event) {
    // Get username from data attribute
    var username = $(event.target).data('username');
    if (username === undefined) { return; }

    Friends.toggleStatus(username, MessagesView.render);
      }

>>>>>>> 09ac82e91ed62db67065eef6305cbd8a809e5a36
};