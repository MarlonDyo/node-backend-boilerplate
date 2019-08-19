const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const server = require('../app/index');

chai.use(chaiHttp);

describe('Testing route: /api/v1/tests', () => {
  const url = '/api/v1/tests';
  const validEntry = {
    name: faker.name.findName(),
  };
  const invalidEntry = {
    name: 'Adam',
  };

  before((done) => { done(); });
  after((done) => { done(); });

  describe('CREATE', () => {
    it('should not respond to empty post', (done) => {
      chai
        .request(server)
        .post(`${url}`)
        .end((err, res) => {
          expect(res.status).to.be.equal(422);
          done();
        });
    });
    it('should respond to post', (done) => {
      chai
        .request(server)
        .post(`${url}`)
        .send(validEntry)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    it('should not respond to invalid post', (done) => {
      chai
        .request(server)
        .post(`${url}`)
        .send(invalidEntry)
        .end((err, res) => {
          expect(res.status).to.be.equal(422);
          done();
        });
    });
  });
  describe('READ', () => {
    it('should list ALL items', (done) => {
      chai
        .request(server)
        .get(url)
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
        .get(`${url}/1`)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.deep.equal({ id: 1, name: 'test 1' });
          done();
        });
    });
    it('should not respond to get id=10', (done) => {
      chai
        .request(server)
        .get(`${url}/10`)
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
        .put(`${url}/1`)
        .send(validEntry)
        .end((err, res) => {
          expect(res.body).to.deep.include({ id: 1, name: validEntry.name });
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    it('should not respond to put id=10', (done) => {
      chai
        .request(server)
        .put(`${url}/10`)
        .send(validEntry)
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
        .delete(`${url}/1`)
        .end((err, res) => {
          expect(res.body).to.deep.include({ id: 1 });
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    it('should not respond to delete id=10', (done) => {
      chai
        .request(server)
        .delete(`${url}/10`)
        .send(validEntry)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });
});
