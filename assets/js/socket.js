var socket = io.sails.connect();

socket.on('connect', function() {
    socket.get('/api/user/join', function(data) {
        console.log(data);
    });
});

socket.on("online", function(data) {
    console.log(data.message + "is online");
    var tr = $('#onlineUsers tbody').append('<tr><td><a>' + data.message + '</a></td></tr>');
    online_user = data.message;
    console.log(online_user);
    $('#onlineUsers tbody tr').attr("id", online_user);
});

socket.on("offline", function(data) {
    console.log(data.message + " removed from table...");
    var id = data.message;
    $('#' + id).hide();
});
