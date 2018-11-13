var should = require('should');
var request = require('request');
describe('Run before any test', function() {
  var token;
  before(function(done) {
    request.post('https://storemanagerv2.herokuapp.com/api/v2/auth/login')
      .send({
        email: 'mary@gmail.com',
        password: 'g@_gigz-2416'
      })
      .end(function(err, res) {
        if (err) throw err;
        token = { token: res.body.token }
        done();
      });
  });
  
  it('get all products', function(done) {
    request.get('https://storemanagerv2.herokuapp.com/api/v2/products')
      .query(token)
      .expect(200)
      .end(function(err, res) {
        should(err).equal(null);
        done()
      });
  });
});