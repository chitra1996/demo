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

    loginEvent: function(req) {
        sails.sockets.removeRoomMembersFromRooms("users", "user" + req.session.username);
        sails.sockets.broadcast("users", "online", {
            message: req.session.username
        });
        sails.sockets.addRoomMembersToRooms("user" + req.session.username, "users");
    },

    loggingOut: function(req) {
        console.log(req.session.username + " logging out...");
        sails.sockets.broadcast("users", "offline", {
            message: req.session.username
        });
    }
};
