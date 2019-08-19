const chai = require('chai');
const { expect } = require('chai');

const faker = require('faker');
const server = require('../app/index');
const knex = require('../db/knex');

chai.use(require('chai-http'));
chai.use(require('chai-like'));
chai.use(require('chai-things'));

describe('Testing route: /api/v1/examples', () => {
  const url = '/api/v1/examples';
  const validEntry = {
    name: faker.name.findName(),
    value: 0.5,
  };
  const validUpdateEntry = {
    value: 2,
  };
  const invalidEntry = {
    name: 'Adam',
    value: 0.5,
  };

  before((done) => {
    knex.migrate.latest().then(() => knex.seed.run()).then(() => done());
  });
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
  });
  describe('READ', () => {
    it('should list ALL items', (done) => {
      chai
        .request(server)
        .get(url)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.be.an('array')
            .to.contain.something.like({ name: 'example 1', value: 0.2 })
            .to.contain.something.like({ name: 'example 2', value: 0.4 })
            .to.contain.something.like({ name: 'example 3', value: 0.6 })
            .to.contain.something.like({ id: 4, name: validEntry.name });
          done();
        });
    });
    it('should respond to get id=1', (done) => {
      chai
        .request(server)
        .get(`${url}/1`)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.include.something.like({ name: 'example 1', value: 0.2 });
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
        .send(validUpdateEntry)
        .end((err, res) => {
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
          expect(res.body).to.include.something.like({ id: 1 });
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
