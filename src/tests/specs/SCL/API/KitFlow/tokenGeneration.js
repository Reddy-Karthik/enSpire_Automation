const apiResource = require("protractor-api-resource").ProtractorApiResource;
var request = require('request');

describe( "test", function () {

it("token generation", done =>
{

             console.log("creating token");
           var options = {
            method: 'POST',
            url: 'https://project0-qa.enspirecommerce.com/api/v1/security/access/token?grant_type=client_credentials&scope=refreshToken',
            headers: {
                'refreshToken':'application/x-www-form-urlencoded',
              'Authorization':'Basic YWRtaW5AdGhrLmNvbTpteXBhc3N3b3Jk',
              'Content-Type':'application/x-www-form-urlencoded'
            },


            };
            options.json = true;
            request(options, function (error, response, body) {
                var errors = error;
                console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
            global.token=body.access_token;
            console.log("token is "+token);
                done();
            });


});




})
