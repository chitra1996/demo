module.exports = {
    join: function(req, res) {
        sails.socket.join(socket, "user" + req.session.userID, function(err) {
            if (err) {
                return res.status(200).json({
                    message: "error occured"
                });
            }
            res.json({
                message: req.session.userID + " is online"
            });
            sails.socket.addRoomMembersToRooms("user" + req.session.userID, "users");
        });
    },
    reload: function() {
        sails.socket.broadcast("users", "reload");
    }
};
