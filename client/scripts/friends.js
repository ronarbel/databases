var Friends = {
<<<<<<< HEAD
  friends: {},
  toggleStatus: function(name) {
    name = name.replace(/ /g, '');
    if (!Friends.friends[name] && name !== App.username) {
      Friends.friends[name] = 1;
    }
    $('.' + name).css({
      color: '#bd8c7d',
      borderColor: 'd1bfa7'   
    });
  }
=======


  _data: new Set,

  items: function() {
    return _.chain([...Friends._data]);
  },

  isFriend: function(name) {
    return Friends._data.has(name);
  },

  toggleStatus: function(name, callback = ()=>{}) {
    if (Friends._data.has(name)) {
      Friends._data.delete(name);
      callback(false);
    } else {
      Friends._data.add(name);
      callback(true);
    }
  }
  
>>>>>>> 09ac82e91ed62db67065eef6305cbd8a809e5a36
};