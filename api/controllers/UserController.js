/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

"use strict";

module.exports = {
    index: (req, res) => {
        if (req.session.authenticated === true) {
            res.redirect('/home');
        } else {
            res.view('home/login');
        }
    },

    home: (req, res) => {
        if (req.session.authenticated === true) {
            res.view('home/index');
            setTimeout(() => {Socket.events()}, 5000);
        } else {
            res.redirect('/');
        }
    },

    login: (req, res) => {
        if (req.body.username && req.body.password) {
            User.findOne({
                username: req.body.username,
                password: req.body.password
            }).exec((error, result) => {
                if (error) {
                    res.view('500')
                } else if (!result) {
                    res.view('403')
                } else {
                    req.session.authenticated = true;
                    req.session.username = req.body.username;
                    res.redirect('/home');
                }
            });
        } else {
            res.view('403')
        }
    },

    logout: (req, res) => {
        req.session.destroy(function() {
            res.redirect('/');
        });
    },

    signup: (req, res) => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            age: req.body.age,
            password: req.body.password
        }).exec(function(err, newUser) {
            if (err) {
                console.log(err);
                res.serverError();
            } else {
                res.redirect('/');
            }
        });
    },
    userlogin: (req,res) => {
        if (req.isSocket && req.session.authenticated) {
            Socket.join(req,res);
        } else {
            res.status(400).send({
                success: false
            });
        }
    }
};
