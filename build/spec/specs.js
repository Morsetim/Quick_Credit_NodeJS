"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _supertest = _interopRequireDefault(require("supertest"));

var _app = _interopRequireDefault(require("../app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var expect = _chai["default"].expect;
var request = (0, _supertest["default"])(_app["default"]);
var myToken;
var wrongToken = 'hghgjhgjgjgjggg';
describe('All test cases for QuickCredit application', function () {
  describe('test case for loading application home page', function () {
    it('Should load application home page', function (done) {
      request.get('/').set('Content-Type', 'application/json').expect(200).end(function (err, res) {
        expect(res.body).deep.equal({
          message: "Welcome to QuickCredit Loan App"
        });
        if (err) done(err);
        done();
      });
    });
  });
  describe('All test cases for application invalid routes', function () {
    it('Should fail to get route', function (done) {
      request.get('/api/v1').set('Content-Type', 'application/json').expect(404).end(function (err, res) {
        expect(res.body).deep.equal({
          status: 'Failed',
          message: 'Page not found'
        });
        if (err) done(err);
        done();
      });
    });
  });
  describe('All test cases for Users', function () {
    describe('All test cases for Users sign up', function () {
      it('Should create a new user account and return a `201`', function (done) {
        var userProfile = {
          firstName: 'xanda',
          lastName: 'cage',
          email: 'cage@yahoo.com',
          password: 'password',
          homeAddress: '55 sango road',
          workAddress: '55 Epic tower'
        };
        request.post('/api/v1/auth/signup').send(userProfile).expect(201).end(function (err, res) {
          expect(res.body).to.be.an('object'); // expect(res.body.status).to.equal(201);
          // expect(res.body.message).to.equal('Successfully created QuickCredit account');
          // expect('xanda').to.deep.equal(res.body.data[0].userData.firstName);
          // expect(res.body.data[0].userData.lastName).to.equal('cage');
          // expect(res.body.data[0].userData.email).to.equal('cage@yahoo.com');
          // expect(res.body.data[0].userData.homeAddress).to.equal('55 sango road');
          // expect(res.body.data[0].userData.workAddress).to.equal('55 Epic tower');
          // if (err) done(err);

          done();
        });
      });
      it('should  check if user already in the model and return a `409`', function (done) {
        var userProfile = {
          firstName: 'xanda',
          lastName: 'cage',
          email: 'cage@yahoo.com',
          password: 'password',
          homeAddress: '55 sango road',
          workAddress: '55 Epic tower'
        };
        request.post('/api/v1/auth/signup').send(userProfile).expect(409).end(function (err, res) {
          // expect(res.body.status).to.equal(409);
          // expect(res.body.message).to.equal('User already exist');
          expect(res.body).to.be.an('object');
          done();
        });
      });
      it('should not create a new user account and return a `422`', function (done) {
        request.post('/api/v1/auth/signup').send({}).expect(422).end(function (err, res) {
          expect(res.body).deep.equal({
            status: 'Failed',
            message: 'All or some fields are empty'
          });
          done();
        });
      });
      it('should  not create a new user account and return a `400`', function (done) {
        request.post('/api/v1/auth/signup').send({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          homeAddress: '',
          workAddress: ''
        }).expect(400).end(function (err, res) {
          expect(res.body.catchErrors.firstName).to.equal('First name length must be at least two characters long');
          expect(res.body.catchErrors.lastName).to.equal('Lastname length must be at least two characters long');
          expect(res.body.catchErrors.email).to.equal('Field must be an Email format');
          expect(res.body.catchErrors.password).to.equal('Field cannot be Empty');
          expect(res.body.catchErrors.homeAddress).to.equal('homeAddress length must be at least ten characters long');
          expect(res.body.catchErrors.workAddress).to.equal('workAddress length must be at least ten characters long');
          done();
        });
      });
      it('should  not create a new user account and return a `400`', function (done) {
        request.post('/api/v1/auth/signup').send({
          firstName: 'e1',
          lastName: 'd222',
          email: 'ccc.com',
          password: 'jbh',
          homeAddress: 'oihh//ssnmsmmmm',
          workAddress: 'oihhssn.../msmmmm'
        }).expect(400).end(function (err, res) {
          expect(res.body.catchErrors.firstName).to.equal('Firstname should only be Alphabets');
          expect(res.body.catchErrors.lastName).to.equal('Lastname should only be Alphabets');
          expect(res.body.catchErrors.email).to.equal('Field must be an Email format');
          expect(res.body.catchErrors.password).to.equal('Password length must be at least six characters long');
          expect(res.body.catchErrors.homeAddress).to.equal('Field should be alphabets and numbers');
          expect(res.body.catchErrors.workAddress).to.equal('Field should be alphabets and numbers');
          done();
        });
      });
    });
    describe('All test cases for user signIn ', function () {
      it('should not Login  a new user and return a `422`', function (done) {
        request.post('/api/v1/auth/signin').send({
          email: 'wronguser',
          password: '12345678'
        }).expect(422).end(function (err, res) {
          expect(res.body.signErrors.email).to.equal('Field must be an Email format');
          expect(res.body.signErrors.password).to.equal('Fields must alphabets');
          done();
        });
      });
      it('should not login new user account and return a `422`', function (done) {
        request.post('/api/v1/auth/signin').send({}).expect(422).end(function (err, res) {
          expect(res.body).deep.equal({
            status: 'Failed',
            message: 'All or some fields are empty'
          });
          done();
        });
      });
      it('should not login a new user account and return a `422`', function (done) {
        request.post('/api/v1/auth/signin').send({
          email: '',
          password: ''
        }).expect(422).end(function (err, res) {
          expect(res.body.signErrors.email).to.equal('Field must be an Email format');
          expect(res.body.signErrors.password).to.equal('Field cannot be Empty');
          done();
        });
      });
      it('should  not login a new user account and return a `400`', function (done) {
        request.post('/api/v1/auth/signin').send({
          email: 'h.com',
          password: 'tyty'
        }).expect(400).end(function (err, res) {
          expect(res.body.signErrors.email).to.equal('Field must be an Email format');
          expect(res.body.signErrors.password).to.equal('Password length must be at least six characters long');
          done();
        });
      });
      it('should Login a new user and return a `201`', function (done) {
        var userInfo = {
          email: 'cage@yahoo.com',
          password: 'password'
        };
        request.post('/api/v1/auth/signin').send(userInfo).expect(201).end(function (err, res) {
          myToken = res.body.token;
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('token');
          done();
        });
      });
      it('Should throe error when regular users try verify user status `', function (done) {
        request.patch('/api/v1/users/mauricium.maurice@yahoo.com/verify').set('x-access-token', myToken).send({
          status: 'verified'
        }).expect(400).end(function (err, res) {
          expect(res.body.message).to.equal('Permission denied'); // expect(res.body.status).to.equal(201);
          // expect(res.body.userProfile.firstName).to.equal('Maurice');
          // expect(res.body.userProfile.lastName).to.equal('Etim');
          // expect(res.body.userProfile.email).to.equal('mauricium.maurice@yahoo.com');
          // expect(res.body.userProfile.homeAddress).to.equal('555 sango road ogun');
          // expect(res.body.userProfile.workAddress).to.equal('67 epic tower anthony');

          done();
        });
      });
      it('change user role for test', function (done) {
        request.patch('/api/v1/users/1/test').set('x-access-token', myToken).expect(200).end(function (err, res) {
          console.log(res.body, '------------');
          expect(res.body).to.be.an('object');
          done();
        });
      });
      it('Should verify user status and return `422`', function (done) {
        request.patch('/api/v1/users/micium.maurice@yahoo.com/verify').set('x-access-token', myToken).send({}).expect(422).end(function (err, res) {
          expect(res.body.status).to.equal("Failed");
          expect(res.body.message).to.equal('This fields cannot be empty');
          done();
        });
      });
    });
    describe('test case for retriving all loan in the QuickCredit', function () {
      it('should return `401` status code with `res.body` failed messages', function (done) {
        request.get('/api/v1/loans').set('x-access-token', wrongToken).expect(401).end(function (err, res) {
          expect(res.body.status).to.equal('Failed');
          expect(res.body.message).to.equal('Authentication failed. Token is either invalid or expired');
          done();
        });
      });
      it('should get a one loan return `201` status code with `res.body` success messages', function (done) {
        request.get('/api/v1/loans/1').set('x-access-token', myToken).expect(201).end(function (err, res) {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          done();
        });
      });
      it('should get loan id return `422 status code with `res.body` success messages', function (done) {
        request.get('/api/v1/loans/22').set('x-access-token', wrongToken).expect(422).end(function (err, res) {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          done();
        });
      });
      it('should get repaid loans return `201 status code with `res.body` success messages', function (done) {
        request.get('/api/v1/loans/repaid').set('x-access-token', myToken).set('Content-Type', 'application/json').expect(201).end(function (err, res) {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          done();
        });
      });
      it('should return `201` status code with `res.body` success messages', function (done) {
        request.get('/api/v1/loans').set('x-access-token', myToken).expect(201).end(function (err, res) {
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('status');
          done();
        });
      });
      it('should get repaid loans return `201 status code with `res.body` success messages', function (done) {
        request.get('/api/v1/loans/unrepaid').set('Content-Type', 'application/json').expect(201).end(function (err, res) {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('data');
          done();
        });
      });
      it('Should get loan repayment history return `201 status code with `res.body` success messages', function (done) {
        request.get('/api/v1/loans/1/repayment').set('x-access-token', myToken).expect(201).end(function (err, res) {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          done();
        });
      });
      it('Should get loan repayment history return `201 status code with `res.body` success messages', function (done) {
        request.get('/api/v1/loans/55/repayment').set('x-access-token', wrongToken).expect(422).end(function (err, res) {
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          done();
        });
      });
    });
    describe('All test case loan Application', function () {
      it('Should create a new loan application and return a `201`', function (done) {
        var applyLoan = {
          firstName: 'xanda',
          lastName: 'cage',
          email: 'cage@yahoo.com',
          tenor: '3 month',
          amount: '55,000'
        };
        request.post('/api/v1/loans').send(applyLoan).expect(201).end(function (err, res) {
          console.log(res.body, '===================');
          done();
        });
      });
    });
  });
});