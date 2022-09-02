/* eslint-disable max-lines-per-function */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import fs from 'fs';
import app from '../..';
import { Admin, Assessment } from '../../app/models';
import { createAdmin, signInAdmin, assessmentObj, batchObj } from '../fixtures/helpers';

chai.use(chaiHttp);
let token;
let adminId;
describe('Admin', () => {
  before(async () => {
    await Admin.deleteMany({});
    await Assessment.deleteMany({});
  });
  describe('post', () => {
    it('should sign up an admin', (done) => {
      chai
        .request(app)
        .post('/api/v1/admin/signup')
        .set('content-type', 'multipart/form-data')
        .field('fullName', createAdmin.fullName)
        .field('email', createAdmin.email)
        .field('phoneNumber', createAdmin.phoneNumber)
        .field('country', createAdmin.country)
        .field('address', createAdmin.address)
        .field('password', createAdmin.password)
        .attach('img', fs.readFileSync(`${__dirname}/camera.jpg`), 'integration/camera.jpg')
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should sign in admin', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/admin/login')
        .send(signInAdmin)
        .end((err, res) => {
          adminId = res.body.data._id;
          token = res.body.data.token;
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should create an assessment', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/create-assessment')
        .set('token', token)
        .send(assessmentObj)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('should create a batch', (done) => {
      chai
        .request(app)
        .post('/api/v1/auth/batch-application')
        .set('token', token)
        .send(batchObj)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

  describe('get', () => {
    it('should get admin details', (done) => {
      chai
        .request(app)
        .get(`/api/v1/auth/admin/${adminId}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should get all applicants', (done) => {
      chai
        .request(app)
        .get('/api/v1/auth/applicants')
        .set('token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should get all batches', (done) => {
      chai
        .request(app)
        .get('/api/v1/auth/all/batches')
        .set('token', token)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  describe('put', () => {
    it('should update admin timer', (done) => {
      chai
        .request(app)
        .put(`/api/v1/auth/admin/timer/${adminId}`)
        .set('token', token)
        .send({ time: '1800' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
    it('should update a field or more in all applicants', (done) => {
      chai
        .request(app)
        .put('/api/v1/auth/applicants')
        .set('token', token)
        .send({ time: '1800' })
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
