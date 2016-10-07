'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

/*
* new user sign-up
*/
router.post('/', controller.create);

/*
* user authenticated area
*/
// get own profile information
router.get('/profile', auth.isAuthenticated(), controller.me);

// update profile
router.put('/', auth.isAuthenticated(), controller.updateuser);
router.put('/updatePassword', auth.isAuthenticated(), controller.changePassword);

/*
* user manager, admin area
*/
// create a new user
router.post('/register', auth.hasRole('manager'), controller.admin_usercreate);

// get the list of users
router.get('/', auth.hasRole('manager'), controller.index);

// get the profile information of particular user
router.get('/profile/:id', auth.hasRole('manager'), controller.show);

// update the information of user
router.put('/:id', auth.hasRole('manager'), controller.admin_updateuser);
router.put('/updatePassword/:id', auth.hasRole('manager'), controller.admin_changePassword);

// delete a user
router.delete('/:id', auth.hasRole('manager'), controller.destroy);

module.exports = router;
