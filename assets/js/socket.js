var socket = io.sails.connect();

socket.on('connect', function() {
    socket.get('/api/user/join', function(data) {
        console.log(data);
    });
});

socket.on('online', function(data) {
    var onUser = data.onlineUser;
    console.log(onUser);
    var tr = $('#onlineUsers tbody').append('<tr><td><a>' + onUser + '</a></td></tr>');
    tr.setAttribute("id", onUser, 0);
});

socket.on("logOut", function(data) {
    var onUser = data.username;
    console.log(onUser + " removed from table...");
    $('#onlineUsers tbody tr td').closest($onUser).remove();
});
