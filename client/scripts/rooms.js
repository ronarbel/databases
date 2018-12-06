var Rooms = {
<<<<<<< HEAD
  spareRooms: ['kitchen', 'foyer', 'water_cooler', 'garden', 'billiards', 'study', 'galley', 'the_brig', 'tavern', 'sketch_alleyway'],
  activeRooms: [],
  
  render: _.template(`
    <option value=" <%- roomname%> ">
      <%- roomname%>
    </option>
  `),
  
  add: function() {
    if (Rooms.spareRooms.length) {
      var poppedRoom = Rooms.spareRooms.pop();
      Rooms.activeRooms.push(poppedRoom);
      $('#rooms select').append(Rooms.render({roomname: poppedRoom}));//another random array of values, roomname chosen by math.random
    }
  }
=======


  _data: new Set,

  selected: 'lobby',

  items: function() {
    return _.chain([...Rooms._data]);
  },

  isSelected: function(roomname) {
    return roomname === Rooms.selected ||
           !roomname && Rooms.selected === 'lobby';
  },

  add: function(room, callback = ()=>{}) {
    Rooms._data.add(room);
    Rooms.selected = room;
    callback(Rooms.items());
  },

  update: function(messages, callback = ()=>{}) {
    var length = Rooms._data.size;

    _.chain(messages)
      .pluck('roomname')
      .uniq()
      .each(room => Rooms._data.add(room));

    if (Rooms.selected === null) {
      // make the first room the default selected room
      Rooms.selected = Rooms._data.values().next().value;
    }

    // only invoke the callback if something changed
    if (Rooms._data.size !== length) {
      callback(Rooms.items());
    }
  }
  
>>>>>>> 09ac82e91ed62db67065eef6305cbd8a809e5a36
};