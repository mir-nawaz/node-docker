'use strict';

import redis from 'redis';
import config from '../config';
import log from '../util/logger';

let cli = null;
/**
 * create redis client
 * @returns {Client} redis client
 */
const client = () => {
  const redisConfig = config.redis();

  if (cli) return cli;

  cli = redis.createClient({
    ...redisConfig,
    retry_strategy(options) {
      if (options.error && options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with
      // a individual error
        return new Error('The server refused the connection');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands
      // with a individual error
        return new Error('Retry time exhausted');
      }
      if (options.attempt > 10) {
      // End reconnecting with built in error
        return undefined;
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000);
    },
  });
  cli.on('error', (err) => {
    log.error(`Error ${err}`);
  });

  cli.on('connect', () => {
    log.info('Redis connected');
  });
  return cli;
};

export default client;
