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
        console.log("user " + req.session.username);
        sails.sockets.broadcast("users", "online", {
            onlineUser: req.session.username
        }, "req.socket");
    },

    loggingOut: function(req) {
        var onUser = req.session.username;
        console.log(onUser + " logging out...");
        sails.sockets.broadcast("users", "logOut" ,{
            loggedOut: onUser + " logged out"
        }, "req.socket");
    }
};
