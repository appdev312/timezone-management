'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

/**
 * user sign-up
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  
  newUser.provider = 'local';
  newUser.role = 'user';
  
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);

    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresIn: 5*60*60 });
    res.json({ token: token });
  });
};

/**
 * admin register user
 */
exports.admin_usercreate = function (req, res, next) {
  var newUser = new User(req.body);
  
  newUser.provider = 'local';
  newUser.role = req.body.role;
  
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);

    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresIn: 5*60*60 });
    res.json({ token: token });
  });
};

/**
 * Get list of users
 * restriction: 'manager', 'admin'
 */
exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function (err, users) {
    if(err) return res.status(500).send(err);
    res.status(200).json(users);
  });
};

/**
 * Get a single user
 * restriction: 'manager', 'admin'
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.sendStatus(404);

    res.json(user.profile);
  });
};

/*
 * update a single user
 * restriction: 'manager', 'admin'
*/
exports.admin_updateuser = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  if (req.body.password) { delete req.body.password; }
  // if (req.user.role != "admin" && req.body.role && req.body.role == "admin") return res.sendStatus(403);

  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    if (!user) return res.sendStatus(404);

    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) return validationError(res, err);
      
      return res.status(200).json(user);
    });
  });
};

/**
 * Change a single user's password
 * restriction: 'manager', 'admin'
 */
exports.admin_changePassword = function(req, res, next) {
  var userId = req.params.id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;

      user.save(function(err) {
        if (err) return validationError(res, err);
        res.sendStatus(200);
      });
    } else {
      res.sendStatus(403);
    }
  });
};

/**
 * Deletes a user
 * restriction: 'manager', 'admin'
 */
exports.destroy = function(req, res) {
  User.findOne({ _id: req.params.id }, function(err, user){
    if (err) return res.status(500).send(err);
    if (!user) return res.sendStatus(404);
    // if (req.user.role != "admin" && user.role == "admin") return res.sendStatus(403);

    user.remove(function(){
      return res.sendStatus(204);
    });
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;

  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(404);
    
    res.json(user);
  });
};

/*
 * update a user
*/
exports.updateuser = function(req, res) {
  var userId = req.user._id;
  if (req.body._id) { delete req.body._id; }
  if (req.body.password) { delete req.body.password; } // strip parameters of password
  if (req.body.role) { delete req.body.role; }

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.sendStatus(404);

    var updated = _.merge(user, req.body);
    updated.save(function (err) {
      if (err) return validationError(res, err);
      
      return res.status(200).json(user);
    });
  });
};

/**
 * Change a user's password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;

      user.save(function(err) {
        if (err) return validationError(res, err);
        res.sendStatus(200);
      });
    } else {
      res.sendStatus(403);
    }
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
