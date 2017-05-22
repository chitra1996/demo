var socket = io.sails.connect();
socket.on('connect', function() {
    socket.get('/api/user/join', function(data) {
        console.log(data);
    });
});

socket.on('message', function(data) {
    console.log(data);
});
