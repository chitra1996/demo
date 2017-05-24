module.exports = {

    join: function(req, res) {

        //console.log("user " + req.session.username);

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

    events: function(req) {
        console.log("Firing event...");
        sails.sockets.broadcast("users", "online", {
            message: req.session.username
        }, req.socket.username);
    },

    loggingOut: function(req) {
        console.log(req.session.username + " logging out...");
        sails.sockets.broadcast("users", "offline", {
            message: req.session.username
        });
    }
};
