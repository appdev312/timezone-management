// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('mongoose');
var config = require('./server/config/environment');
var User = require('./server/api/user/user.model');
var Timezone = require('./server/api/timezone/timezone.model');

var conn = mongoose.connect(config.mongo.uri, config.mongo.options, function(err){
	conn.connection.db.dropDatabase();

	User.create(
	    {
		    provider: 'local',
		    name: 'admin',
		    email: 'admin@timezone.com',
		    role: 'admin',
		    password: 'password'
	    },
	    {
		    provider: 'local',
		    name: 'manager',
		    email: 'manager@timezone.com',
		    role: 'manager',
		    password: 'password'
	    },
	    {
		    provider: 'local',
		    name: 'owutao',
		    email: 'owutao@aol.com',
		    password: 'password'
		},
		{
		    provider: 'local',
		    name: 'dennis',
		    email: 'dennis.van122@yahoo.com',
		    password: 'password'
		},	function() {
	  		console.log('Finished populating users.');

	  		User.findOne({email: 'owutao@aol.com'}, function(err, usr){
				if (err) done(err);

				Timezone.create(
				    {
					    userId: usr._id,
					    name: 'CST',
					    nameOfCity: "Beijing, Shanghai", 
					    differenceToGMT: 8,
					    active: true
				    },
				    {
					    userId: usr._id,
					    name: 'JST',
					    nameOfCity: "Tokyo, Osaka", 
					    differenceToGMT: 9,
					    active: true
				    },
				    {
					    userId: usr._id,
					    name: 'AEST',
					    nameOfCity: "Brisbane", 
					    differenceToGMT: 10,
					    active: true
				    },	function() {
				    	console.log('Finished populating notes.');
				    	process.exit();
				    }
				);
			})
		}
	);
});