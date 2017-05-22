module.exports = {
    join: function(req, res) {
        sails.sockets.join(req.socket, "user" + req.session.username, function(err) {
            if (err) {
                return res.status(200).json({
                    message: "error occured"
                });
            }
            res.json({
                message: req.session.username + " is online"
            });
            sails.socket.addRoomMembersToRooms("user" + req.session.username, "users");
        });
    },
    reload: function() {
        sails.socket.broadcast("users", "reload");
    }
};
