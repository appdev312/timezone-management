'use strict';

var _ = require('lodash');
var Timezone = require('./timezone.model');

var validationError = function(res, err) {
  return res.status(422).json(err);
};

var handleError = function(res, err) {
  return res.status(500).send(err);
}

// Get list of timezones
exports.index = function(req, res) {
  if (req.user.role == "admin")
  {
    Timezone.find({}, function (err, timezones) {
      if(err) { return handleError(res, err); }

      return res.status(200).json(timezones);
    });
  }
  else
  {
    Timezone.find({ userId: req.user.id }, function (err, timezones) {
      if(err) { return handleError(res, err); }

      return res.status(200).json(timezones);
    });
  }
};

// Get a single timezone
exports.show = function(req, res) {
  if (req.user.role == "admin")
  {
    Timezone.findById(req.params.id, function (err, timezone) {
      if(err) { return handleError(res, err); }
      if(!timezone) { return res.sendStatus(404); }

      return res.json(timezone);
    });
  }
  else
  {
    Timezone.findOne({ userId: req.user.id, _id: req.params.id }, function (err, timezone) {
      if(err) { return handleError(res, err); }
      if(!timezone) { return res.sendStatus(404); }

      return res.json(timezone);
    });
  }
};

// Creates a new timezone in the DB
exports.create = function(req, res) {
  var newNote = new Timezone(req.body);
  if (req.user.role != "admin") newNote.userId = req.user.id;
  if (!newNote.userId) return res.sendStatus(422);

  Timezone.create(newNote, function(err, timezone) {
    if (err) return validationError(res, err);
    
    return res.status(201).json(timezone);
  });
};

// Updates an existing timezone in the DB
exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }

  if (req.user.role == "admin")
  {
    Timezone.findById(req.params.id, function (err, timezone) {
      if (err) return handleError(res, err);
      if(!timezone) return res.sendStatus(404);

      var updated = _.merge(timezone, req.body);
      updated.save(function (err) {
        if (err) return handleError(res, err);
        return res.status(200).json(timezone);
      });
    });
  }
  else
  {
    Timezone.findOne({ userId: req.user.id, _id: req.params.id }, function (err, timezone) {
      if (err) return handleError(res, err);
      if(!timezone) return res.sendStatus(404);

      var updated = _.merge(timezone, req.body);
      updated.save(function (err) {
        if (err) return handleError(res, err);
        return res.status(200).json(timezone);
      });
    });
  }
};

// Deletes a timezone from the DB
exports.destroy = function(req, res) {
  if (req.user.role == "admin")
  {
    Timezone.findById(req.params.id, function (err, timezone) {
      if(err) { return handleError(res, err); }
      if(!timezone) { return res.sendStatus(404); }

      timezone.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.sendStatus(204);
      });
    });
  }
  else
  {
    Timezone.findOne({ userId: req.user.id, _id: req.params.id }, function (err, timezone) {
      if (err) { return handleError(res, err); }
      if (!timezone) { return res.sendStatus(404); }

      timezone.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.sendStatus(204);
      });
    });
  }
};