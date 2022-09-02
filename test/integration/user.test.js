/* eslint-disable max-lines-per-function */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../..';
import { User, Application } from '../../app/models';
// import { invalidLoginObj } from '../fixtures/auth';
import { createUser, signInUser, userApplication, updateObj, errorcreateUser } from '../fixtures/helpers';

chai.use(chaiHttp);
let token;
let userId;
describe('User.post', () => {
  before(async () => {
    await User.deleteMany({});
    await Application.deleteMany({});
  });
  it('should be able to create a user', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send(createUser)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('should return an error response for creating user', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send(errorcreateUser)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
});
describe('User.post', () => {
  it('should sign in a user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/user/login')
      .send(signInUser)
      .end((err, res) => {
        token = res.body.data.token;
        expect(res.status).to.equal(200);
        done();
      });
  });
  // it('should return an error when user signs in', (done) => {
  //   chai
  //     .request(app)
  //     .post('/api/v1/auth/user/login')
  //     .send(invalidLoginObj)
  //     .end((err, res) => {
  //       token = res.body.data.token;
  //       expect(res.status).to.equal(400);
  //       done();
  //     });
  // });
});
describe('User.post', () => {
  it('should create an application for user', (done) => {
    chai
      .request(app)
      .post('/api/v1/auth/application')
      .set('token', token)
      .set('content-type', 'multipart/form-data')
      .field('firstName', userApplication.firstName)
      .field('lastName', userApplication.lastName)
      .field('emailAddress', userApplication.emailAddress)
      .field('dateOfBirth', userApplication.dateOfBirth)
      .field('address', userApplication.address)
      .field('university', userApplication.university)
      .field('course', userApplication.course)
      .field('cgpa', userApplication.cgpa)
      .attach('cv', fs.readFileSync(`${__dirname}/file.pdf`), 'integration/file.pdf')
      .attach('img', fs.readFileSync(`${__dirname}/camera.jpg`), 'integration/camera.jpg')
      .end((err, res) => {
        userId = res.body.data.details._id;
        expect(res.status).to.equal(201);
        done();
      });
  });
});
describe('User.get', () => {
  it('should return an applicant', (done) => {
    chai
      .request(app)
      .get(`/api/v1/auth/user/${userId}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
describe('User.get', () => {
  it('should return a list of questions', (done) => {
    chai
      .request(app)
      .get('/api/v1/auth/questions')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
describe('User.put', () => {
  it('should update user details', (done) => {
    chai
      .request(app)
      .put(`/api/v1/auth/user/${userId}`)
      .set('token', token)
      .send(updateObj)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });
});
