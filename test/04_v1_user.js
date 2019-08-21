const chai = require('chai');
const { expect } = require('chai');

const server = require('../app/index');
const knex = require('../db/knex');

chai.use(require('chai-http'));
chai.use(require('chai-like'));
chai.use(require('chai-things'));

const url = '/api/v1/users';

describe(`Testing route: ${url}`, () => {
  const seedEntry = {
    username: 'admin',
    password: '7FPhSx7y',
  };

  const validEntry = {
    username: 'testusername',
    password: 'qwertyqwe',
    email: 'testusername@example.com',
  };
  const invalidEntry = {
    username: 'de',
    password: 'qwertyqwe',
  };
  const invalidSignInEntry = {
    username: 'testusername',
    password: 'qwertyqwe2',
  };
  const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'
  + 'eyJpc3MiOiJub2RlLWJhY2tlbmQtYm9pbGVycGxhdGUiLCJpYXQiOjE1'
  + 'NjYyNDQxMDk3ODQsImV4cCI6MTU2NjMzMDUwOTc4NH0.'
  + 'iLXmiKtwY942lh6dtntSKDnEczryLuKM3-ofhRCO3Fg';
  const newData = {
    password: '123456',
    email: 'new@example.com',
    email2: 'new2@example.com',
  };


  before((done) => {
    knex.migrate.latest().then(() => knex.seed.run()).then(() => done());
  });
  after((done) => { done(); });

  describe('SIGN UP', () => {
    it('should not respond to empty post', (done) => {
      chai
        .request(server)
        .post(`${url}/signup`)
        .end((err, res) => {
          expect(res.status).to.be.equal(422);
          done();
        });
    });
    it('should not respond to invalid post', (done) => {
      chai
        .request(server)
        .post(`${url}/signup`)
        .send(invalidEntry)
        .end((err, res) => {
          expect(res.status).to.be.equal(422);
          done();
        });
    });
    it('should respond to post', (done) => {
      chai
        .request(server)
        .post(`${url}/signup`)
        .send(validEntry)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.have.nested.property('token');
          done();
        });
    });
  });
  describe('SIGN IN', () => {
    it('should not respond to empty post', (done) => {
      chai
        .request(server)
        .post(`${url}/signin`)
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          done();
        });
    });
    it('should not respond to invalid post', (done) => {
      chai
        .request(server)
        .post(`${url}/signin`)
        .send(invalidSignInEntry)
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          done();
        });
    });
    it('should respond to post', (done) => {
      chai
        .request(server)
        .post(`${url}/signin`)
        .send(validEntry)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.have.nested.property('token');
          done();
        });
    });
  });
  describe('SECRET', () => {
    let token;

    before((done) => {
      chai
        .request(server)
        .post(`${url}/signin`)
        .send(validEntry)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });
    it('should not validate without token', (done) => {
      chai
        .request(server)
        .get(`${url}/secret`)
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          done();
        });
    });
    it('should validate with valid token', (done) => {
      chai
        .request(server)
        .get(`${url}/secret`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    it('should not validate with invalid token', (done) => {
      chai
        .request(server)
        .get(`${url}/secret`)
        .set('Authorization', invalidToken)
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          done();
        });
    });
  });
  describe('READ', () => {
    let token;

    before((done) => {
      chai
        .request(server)
        .post(`${url}/signin`)
        .send(validEntry)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });
    it('should respond to get with valid username', (done) => {
      chai
        .request(server)
        .get(`${url}`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.include.something.like(
            { username: validEntry.username, email: validEntry.email },
          );
          done();
        });
    });
    it('should not respond to get with invalid username', (done) => {
      chai
        .request(server)
        .get(`${url}`)
        .set('Authorization', invalidToken)
        .end((err, res) => {
          expect(res.status).to.be.equal(401);
          done();
        });
    });
  });
  describe('UPDATE', () => {
    let token;

    before((done) => {
      chai
        .request(server)
        .post(`${url}/signin`)
        .send(validEntry)
        .end((err, res) => {
          token = res.body.token;
          done();
        });
    });

    it('should work for empty update', (done) => {
      chai
        .request(server)
        .put(`${url}`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.include.something.like(
            { username: validEntry.username, email: validEntry.email },
          );
          done();
        });
    });
    it('should work for email update only', (done) => {
      chai
        .request(server)
        .put(`${url}`)
        .set('Authorization', token)
        .send({ email: newData.email })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.include.something.like(
            { username: validEntry.username, email: newData.email },
          );
          done();
        });
    });
    it('should work for email and password', (done) => {
      chai
        .request(server)
        .put(`${url}`)
        .set('Authorization', token)
        .send({ email: newData.email2, password: newData.password })
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.include.something.like(
            { username: validEntry.username, email: newData.email2 },
          );
          done();
        });
    });
  });
  describe('DELETE', () => {
    let token;

    before((done) => {
      chai
        .request(server)
        .post(`${url}/signin`)
        .send(seedEntry)
        .end((err, res) => {
          if (res.status === 200) {
            token = res.body.token;
          }
          done();
        });
    });

    it('should delete item', (done) => {
      chai
        .request(server)
        .delete(`${url}`)
        .set('Authorization', token)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          expect(res.body).to.include.something.like(
            { username: seedEntry.username },
          );
          done();
        });
    });
  });
});
