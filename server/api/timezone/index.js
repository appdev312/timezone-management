'use strict';

var express = require('express');
var controller = require('./timezone.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

/*
* user-authenticated area
*/

// get the list of timezone entries
router.get('/', auth.isAuthenticated(), controller.index);

// get the particular timezone entry
router.get('/:id', auth.isAuthenticated(), controller.show);

// create a new timezone entry
router.post('/', auth.isAuthenticated(), controller.create);

// update a timezone entry
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);

// delete a timezone entry
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;
