var config = require('pelias-config').generate();
var { Client } = require('@elastic/elasticsearch');
var esClientOptions = require('./esClientOptions');
var client = new Client(esClientOptions(config.esclient));
var schema = require('../schema');

var _index = config.schema.indexName;

// Error: ElasticsearchIllegalArgumentException[can't change the number of shards for an index
if( schema.settings.hasOwnProperty('index') &&
    schema.settings.index.hasOwnProperty('number_of_shards') ){
  delete schema.settings.index.number_of_shards;
  delete schema.settings.index.number_of_replicas;
}

client.indices.close( { index: _index }, function( err, result ){
  var res = result && result.body;
  console.log( '[close index]', '\t', _index, err || '\t', res );
  client.indices.putSettings( { index: _index, body: schema.settings }, function( err, result ){
    var res = result && result.body;
    console.log( '[put settings]', '\t', _index, err || '\t', res );
    client.indices.open( { index: _index }, function( err, result ){
      var res = result && result.body;
      console.log( '[open index]', '\t', _index, err || '\t', res );
      process.exit( err ? 1 : 0 );
    });
  });
});
