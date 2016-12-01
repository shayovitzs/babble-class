'use strict';
var http = require('http');
var server = http.createServer();
var url = require('url');
var qs = require('querystring');

server.on('request', onRequest);
server.listen(9001);

function onRequest(request, response) {
    console.log(request.url);
    response.setHeader('Access-Control-Allow-Origin', '*'); //from where i permit  to get calls

    var urlObj = url.parse(request.url);
    var endpoint = urlObj.pathname;

    if (endpoint === '/status') {
        response.end('OK');
    } else if (endpoint === '/echo') {
        var requestBody = '';
        request.on('data', function(chunk) {
            requestBody += chunk;
        });
        request.on('end', function() {
            var requestObj = qs.parse(requestBody);
            if (requestObj.echo) {
                response.end(requestObj.echo);
            }
        });
    } else if (endpoint === '/message') {
        var requestBody1 = '';
        request.on('data', function(chunk) {
            requestBody1 += chunk;
        });
        request.on('end', function() {
            var requestObj = qs.parse(requestBody);
            if (requestObj.message) {
                response.end(requestObj.message);
            }
        });
    } else {

        response.writeHead(404);
        response.end(http.STATUS_CODES[404]);
    }

}
