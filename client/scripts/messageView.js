var MessageView = {
  server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,
  
  parse: function(message) {
    return JSON.parse(message);
  },

  render: _.template(`
<<<<<<< HEAD
      <div class="chat <%- roomname%>">
        <div class="username <%- username.replace(/ /g, '')%>"><%- username%></div>
        <div><%- text%></div> 
      </div>
=======
      <!--

      -->
      <div class="chat">
        <div
          class="username <%= Friends.isFriend(username) ? 'friend' : '' %>"
          data-username="<%- username %>">
          <%- username %>
        </div>
        <div><%- text %></div>
      </div>
      <!--
            -->
>>>>>>> 09ac82e91ed62db67065eef6305cbd8a809e5a36
    `)
};