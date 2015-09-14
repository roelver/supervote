'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');

// Get list of polls
exports.index = function(req, res) {
  Poll.find({}, function (err, polls) {
    if(err) { return handleError(res, err); }
    var opts = [
      { path: 'owner', model: 'User', select: 'name' }
    ];
    var promise = Poll.populate(polls, opts);
    
    promise.then(
      function(data) {
        return res.status(200).json(data);
      }
    ).end();
  });
};

exports.myPolls = function(req, res) {
  Poll.find({}, function (err, polls) {
    if(err) { return handleError(res, err); }
    var opts = [
      { path: 'owner', model: 'User', select: 'name' }
    ];
    var promise = Poll.populate(polls, opts);
    
    promise.then(
      function(polls) {
        if (polls) {
            polls = polls.filter(function (poll) {
               if (!poll.owner) return false;
               console.log('Filter: '+req.params.username+' vs. '+poll.owner.name);
               return (poll.owner.name === req.params.username);
           });
        }
        return res.status(200).json(polls);
      }
    ).end();
  });
};

// Get a single poll
exports.show = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    return res.json(poll);
  });
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(poll);
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    var updated = _.merge(poll, req.body);
    updated.options = req.body.options;
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(poll);
    });
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    poll.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  console.log(err);
  return res.status(500).send(err);
}