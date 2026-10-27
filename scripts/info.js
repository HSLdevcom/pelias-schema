var config = require('pelias-config').generate().esclient;
var { Client } = require('@elastic/elasticsearch');
var esClientOptions = require('./esClientOptions');
var client = new Client(esClientOptions(config));

client.info( {}, function( err, result ){
  console.log( err, result && result.body );
});
