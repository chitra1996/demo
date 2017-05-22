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
            sails.sockets.addRoomMembersToRooms("user" + req.session.username, "users");
        });
    },

    events: function() {
        console.log("Firing event");
        sails.sockets.broadcast("users", {username: 11});
    }
};
