var expect = require('chai').expect;
var request = require('request');

const loginCredentials = {
    email: 'mary@gmail.com', 
    password: 'g@_gigz-2416'
}
before(function(done){
    authedUser
      .post('https://storemanagerv2.herokuapp.com/api/v2/auth/login')
      .send(loginCredentials)
      .end(function(err, response){
        expect(response.statusCode).to.equal(200);
        expect('Location', '../templates/products.html');
        done();
      });
  });

  