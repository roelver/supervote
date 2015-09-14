/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
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

Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
});

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


