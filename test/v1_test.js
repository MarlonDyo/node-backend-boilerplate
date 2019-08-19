const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('../app/index');

chai.use(chaiHttp);

describe('Testing route: /api/v1/tests', () => {
  const testUrl = '/api/v1/tests';
  const testEntry = {
    name: faker.name.findName(),
  };
  const invalidTestEntry = {
    name: 'Adam',
  };

  before((done) => { done(); });
  after((done) => { done(); });

  describe('CREATE', () => {
    it('should not respond to empty post', (done) => {
      chai
        .request(server)
        .post(`${testUrl}`)
        .end((err, res) => {
          expect(res.status).to.be.equal(422);
          done();
        });
    });
    it('should respond to post', (done) => {
      chai
        .request(server)
        .post(`${testUrl}`)
        .send(testEntry)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    it('should not respond to invalid post', (done) => {
      chai
        .request(server)
        .post(`${testUrl}`)
        .send(invalidTestEntry)
        .end((err, res) => {
          expect(res.status).to.be.equal(422);
          done();
        });
    });
  });
  describe('READ', () => {
    it('should list ALL tests', (done) => {
      chai
        .request(server)
        .get(testUrl)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.deep.include({ id: 1, name: 'test 1' });
          expect(res.body).to.deep.include({ id: 2, name: 'test 2' });
          expect(res.body).to.deep.include({ id: 3, name: 'test 3' });
          done();
        });
    });
    it('should respond to get id=1', (done) => {
      chai
        .request(server)
        .get(`${testUrl}/1`)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.deep.equal({ id: 1, name: 'test 1' });
          done();
        });
    });
    it('should not respond to get id=10', (done) => {
      chai
        .request(server)
        .get(`${testUrl}/10`)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });
  describe('UPDATE', () => {
    it('should respond to put id=1', (done) => {
      chai
        .request(server)
        .put(`${testUrl}/1`)
        .send(testEntry)
        .end((err, res) => {
          expect(res.body).to.deep.include({ id: 1, name: testEntry.name });
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    it('should not respond to put id=10', (done) => {
      chai
        .request(server)
        .put(`${testUrl}/10`)
        .send(testEntry)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });
  describe('DELETE', () => {
    it('should respond to delete id=1', (done) => {
      chai
        .request(server)
        .delete(`${testUrl}/1`)
        .end((err, res) => {
          expect(res.body).to.deep.include({ id: 1 });
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    it('should not respond to delete id=10', (done) => {
      chai
        .request(server)
        .delete(`${testUrl}/10`)
        .send(testEntry)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });
});
