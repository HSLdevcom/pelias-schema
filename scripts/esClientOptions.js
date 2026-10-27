'use strict';

const _ = require('lodash');

function toNodeUrl(host) {
  if (_.isString(host)) {
    return /^https?:\/\//.test(host) ? host : `http://${host}`;
  }
  const protocol = host.protocol || 'http';
  const port = host.port ? `:${host.port}` : '';
  return `${protocol}://${host.host || 'localhost'}${port}${host.path || ''}`;
}

/**
 * Convert the pelias.json `esclient` section (legacy `elasticsearch` client
 * format) into options for the @elastic/elasticsearch client.
 * Legacy-only options (apiVersion, keepAlive, log, ...) are dropped.
 */
function esClientOptions(esclient) {
  const config = esclient || {};
  const hosts = config.hosts || (config.host ? [config.host] : ['localhost:9200']);
  const options = { nodes: hosts.map(toNodeUrl) };

  if (config.requestTimeout !== undefined) {
    options.requestTimeout = parseInt(config.requestTimeout, 10);
  }
  if (config.maxRetries !== undefined) {
    options.maxRetries = config.maxRetries;
  }
  return options;
}

module.exports = esClientOptions;
