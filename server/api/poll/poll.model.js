'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  question: String,
  owner: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
  },
  options: [{
  	  text: String,
  	  votes: Number
  }]
});

module.exports = mongoose.model('Poll', PollSchema);