/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Poll = require('../api/poll/poll.model');

var addPoll = function() {

    User.findOne({name: 'Test User'}, function(err, testUser) {
      if (err) { 
        console.log('Error '+err); 
        return;
      }
      console.log('Before create poll: ',testUser);
      Poll.create({
        question: 'Who should be the next US president?',
        owner: testUser._id,
        options: [{
          text: 'Donald Trump',
          votes: 4
        }, {
          text: 'Hillary Clinton',
          votes: 6
        }, {
          text: 'Jeb Bush',
          votes: 2
        }]
      }, function() {
          console.log('finished populating polls for Test');
      }
    )

    });

    User.findOne({name: 'Admin'}, function(err, testUser) {
      if (err) { 
        console.log('Error '+err); 
        return;
      }
      console.log('Before create poll: ',testUser);
      Poll.create({
        question: 'Who\'s afraid of Virginia Wolf?',
        owner: testUser._id,
        options: [{
          text: 'I am',
          votes: 1
        }, {
          text: 'No one',
          votes: 12
        }, {
          text: 'My sister',
          votes: 2
        }, {
          text: 'Everyone',
          votes: 0
        }]
      }, {
        question: 'Are you afraid of terrorists in your neighborhood?',
        owner: testUser._id,
        options: [{
          text: 'Yes',
          votes: 12
        }, {
          text: 'No',
          votes: 22
        }]
      }, function() {
          console.log('finished populating polls for Admin');
      }
    )

    });

}

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');

      Poll.find().remove(addPoll);


    }
  );
});


