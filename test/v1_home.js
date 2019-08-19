const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app/index');

chai.use(chaiHttp);

describe('Testing route: /', () => {
  const homeUrl = '/';

  before((done) => { done(); });
  after((done) => { done(); });

  describe('General', () => {
    it('should respond', (done) => {
      chai
        .request(server)
        .get(homeUrl)
        .end((err, res) => {
          expect(res.status).to.be.equal(200);
          done();
        });
    });
    it('should not respond on wrong route', (done) => {
      chai
        .request(server)
        .get(`${homeUrl}/inexistent`)
        .end((err, res) => {
          expect(res.status).to.be.equal(404);
          done();
        });
    });
  });
});
