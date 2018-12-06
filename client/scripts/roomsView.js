var RoomsView = {
  
  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
<<<<<<< HEAD
    Rooms.spareRooms = ['kitchen', 'foyer', 'water_cooler', 'garden', 'billiards', 'study', 'galley', 'the_brig', 'tavern', 'sketch_alleyway'],
    Rooms.activeRooms = [],
    // RoomsView.renderRoom('lobby');
    RoomsView.$button.on('click', function() {
      Rooms.add();
    });
    
    RoomsView.$select.change(function() {
      var room = $('#rooms select option:selected').text().trim();
      var children = $('#chats').children();
      console.log(children.length);
      if (room === '') {
        for (var i = 0; i < children.length; i++) {
          $(children[i]).show();
        }
      } else {
        for (var i = 0; i < children.length; i++) {
          if ($(children[i]).hasClass(room)) {
            $(children[i]).show();
          } else {
            $(children[i]).hide();
          }
        }
      }
    });
  },

  renderRoom: function(name) {
    $('#rooms select').append(Rooms.render({roomname: name}));
  },
=======

    RoomsView.$select.on('change', RoomsView.handleChange);
    RoomsView.$button.on('click', RoomsView.handleClick);
      },

  render: function() {

    RoomsView.$select.html('');
    Rooms
      .items()
      .each(RoomsView.renderRoom);
    RoomsView.$select.val(Rooms.selected);
  },

  renderRoom: function(roomname) {
    var $option = $('<option>').val(roomname).text(roomname);
    RoomsView.$select.append($option);
  },

  handleChange: function(event) {
    Rooms.selected = RoomsView.$select.val();
    MessagesView.render();
  },

  handleClick: function(event) {
    var roomname = prompt('Enter room name');
    if (roomname) {
      Rooms.add(roomname, () => {
        RoomsView.render();
        MessagesView.render();
      });
    }
      }

>>>>>>> 09ac82e91ed62db67065eef6305cbd8a809e5a36
};
