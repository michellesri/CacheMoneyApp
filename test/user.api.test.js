const app = require('../lib/app');
const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const connection = require('./mongoose-setup-testdb');

chai.use(chaiHttp);

describe('end to end tests for user', () => {

    const request = chai.request(app);

    before(done => {
        const drop = () => connection.db.dropDatabase(done);
        if (connection.readyState === 1) drop();
        else connection.on('open', drop);
    });

    const Michael = {
        username: 'Michael Burry',
        password: 'thebigshort'
    };

    it('signs up a new user', done => {
        request
          .post('/users/signup')
          .send(Michael)
          .then(res => {
              console.log('res.body ', res.body);
              done();
          })
          .catch(err => done(err));
    })



})