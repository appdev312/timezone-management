var should = require('chai').should(),
	expect = require('chai').expect,
	supertest = require('supertest'),
	api = supertest('http://localhost:9000');

var config = {
	admin_email: "admin@timezone.com", 
	admin_password: "apple"
};

var fakeuser_token, fakeentry_id, fakeuser_id, admin_token;

describe('API functional testing', function(){
	describe('Sign up - /api/users/', function(){
		it('registering new fake user, should return 200', function(done) {
	        api.post('/api/users/')
			.set('Accept', 'application/x-www-form-urlencoded')
			.send({
	          	email: 'fakeuser@gmail.com',
	          	password: 'apple',
	          	name: 'fakeuser',
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				if (err)
				{
					done(err);
				}else{
					expect(res.body.token).to.not.equal(null);
					done();
				}			
			});
		});

		it('registering fake user with duplicate, should return 422 (validation error)', function(done) {
	        api.post('/api/users/')
			.set('Accept', 'application/x-www-form-urlencoded')
			.send({
	          	email: 'fakeuser@gmail.com',
	          	password: 'apple',
	          	name: 'dupUser',
			})
			.expect('Content-Type', /json/)
			.expect(422)
			.end(done);
		});
	});

	describe('Login - /auth/local', function(){
		it('login as a fake user with wrong credentials, should return 401', function(done) {
			api.post('/auth/local')
			.set('Accept', 'application/x-www-form-urlencoded')
			.send({
				email: 'fakeuser@gmail.com',
	          	password: 'wrong password'
			})
			.expect('Content-Type', /json/)
			.expect(401)
			.end(done);
		});

		it('login as a fake user, should return token', function(done) {
			api.post('/auth/local')
			.set('Accept', 'application/x-www-form-urlencoded')
			.send({
				email: 'fakeuser@gmail.com',
	          	password: 'apple'
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				if (err)
				{
					done(err);
				}else{
					expect(res.body.token).to.not.equal(null);
					fakeuser_token = res.body.token;

					done();
				}
			});
		});
	});

	describe('Get profile - /api/users/profile', function(){
		it('no token, should return 401', function(done) {
			api.get('/api/users/profile')
			.expect(401)
			.end(done);
		});

		it('token provided, should return 200', function(done) {
			api.get('/api/users/profile')
			.expect('Content-Type', /json/)
			.set('Authorization', 'Bearer ' + fakeuser_token)
			.expect(200)
			.end(function(err, res) {
				if (err){
					done(err);
				}else{
					expect(res.body.name).to.equal("fakeuser");
					expect(res.body.email).to.equal("fakeuser@gmail.com");
					expect(res.body.role).to.equal("user");
					fakeuser_id = res.body._id;

					done();
				}
			});
		});
	});

	describe('Update profile - /api/users/', function(){
		it('profile update, should return 200', function(done) {
			api.put('/api/users/')
			.send({
				name: 'new_fakeuser'
			})
			.set('Authorization', 'Bearer ' + fakeuser_token)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				if (err){
					done(err);
				}else{
					expect(res.body.name).to.equal("new_fakeuser");
					expect(res.body.email).to.equal("fakeuser@gmail.com");
					expect(res.body.role).to.equal("user");

					done();
				}
			});
		});
	});

	describe('Change password - /api/users/updatePassword', function(){
		it('change password, should return 200', function(done) {
			api.put('/api/users/updatePassword')
			.send({
				oldPassword: 'apple',
				newPassword: 'newpassword'
			})
			.set('Authorization', 'Bearer ' + fakeuser_token)
			.expect(200)
			.end(done);
		});
	});

	describe('List of timezones - /api/timezones/', function(){
		it('get the list of timezones, should return 200', function(done) {
			api.get('/api/timezones/')
			.set('Authorization', 'Bearer ' + fakeuser_token)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);
		});
	});
  
	describe('Create timezone - /api/timezones/', function(){
		it('create new timezone, should return 200', function(done) {
	        api.post('/api/timezones/')
	        .set('Authorization', 'Bearer ' + fakeuser_token)
			.set('Accept', 'application/x-www-form-urlencoded')
			.send({
				name: "Test Timezone",
				nameOfCity: "Test City",
				differenceToGMT: 8
			})
			.expect('Content-Type', /json/)
			.expect(201)
			.end(function(err, res) {
				if (err)
				{
					done(err);	
				}else{
					expect(res.body.name).to.equal("Test Timezone");
					expect(res.body.nameOfCity).to.equal("Test City");
					expect(res.body.differenceToGMT).to.equal(8);
					
					fakeentry_id = res.body._id;

					done();
				}
			});
		});
	});

	describe('Update timezone - /api/timezones/:id', function(){
		it('update timezone, should return 200', function(done) {
			api.put("/api/timezones/" + fakeentry_id)
			.send({
				differenceToGMT: 5
			})
			.set('Authorization', 'Bearer ' + fakeuser_token)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				if (err){
					done(err);
				}else{
					expect(res.body.differenceToGMT).to.equal(5);
					fakeentry_id = res.body._id;

					done();
				}
			});
		});
	});

	describe('Remove timezone - /api/timezones/:id', function(){
		it('delete timezone, should return 204', function(done) {
			api.delete("/api/timezones/" + fakeentry_id)
			.set('Authorization', 'Bearer ' + fakeuser_token)
			.expect(204)
			.end(done);
		});
	});

	describe('Login - /auth/local', function(){
		it('login as an admin, should return token', function(done) {
			api.post('/auth/local')
			.set('Accept', 'application/x-www-form-urlencoded')
			.send({
				email: config.admin_email,
	          	password: config.admin_password
			})
			.expect('Content-Type', /json/)
			.expect(200)
			.end(function(err, res) {
				if (err)
				{
					done(err);	
				}else{
					expect(res.body.token).to.not.equal(null);
					admin_token = res.body.token;

					done();
				}
			});
		});
	});

	describe('List of users - /api/users/', function(){
		it('get the list of users, should return 200', function(done) {
			api.get('/api/users/')
			.set('Authorization', 'Bearer ' + admin_token)
			.expect('Content-Type', /json/)
			.expect(200)
			.end(done);
		});
	});

	describe('Delete users - /api/users/:id', function(){
		it('delete the fake user, should return 204', function(done) {
			api.delete('/api/users/' + fakeuser_id)
			.set('Authorization', 'Bearer ' + admin_token)
			.expect(204)
			.end(done);
		});
	});
});