var socket = io.sails.connect();
socket.on('connect', function() {
    socket.get('/api/user/join', function(data) {
        console.log(data);
    });
});
/*
socket.on('reload', function(data) {

    var dt = $('#datatable').datatable();
    dt.ajax.reload(null,false);
})
*/
