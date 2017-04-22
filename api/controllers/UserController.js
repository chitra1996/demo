/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

"use strict";

const locals = require('../../config/local.js');

module.exports = {
  index: (req, res) => {
    if (req.session.authhenticated === true) {
      res.redirect('/home');
    } else {
      res.view('home/login');
    }
  },

  home: (req, res) => {
    if (req.session.authhenticated === true) {
      res.view('home/index');
    } else {
      res.redirect('/');
    }
  },

  login: (req, res) => {
    console.log(req.body.username, req.body.password);
    if (req.body.username && req.body.password) {
      User.findOne({
        username: req.body.username,
        password: req.body.password
      }).exec((error, result) => {
        console.log(error, result);
        if (error) {
          res.view('500')
        } else if (!result) {
          res.view('403')
        } else {
          req.session.authhenticated = true;
          res.view('home/index')
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
        console.log(err);
      if (err) {
        res.serverError();
      } else {
        res.redirect('/');
      }
    });
}

  /*login: (req,res) => {
      res.json({
          success: true,
          data: {
              message: "successfully logged in!"
          }
      });
  },

  logout: (req,res) => {
      res.json({
          success: true,
          data: {
              message: "successfully logged out!"
          }
      });
  }*/
};
