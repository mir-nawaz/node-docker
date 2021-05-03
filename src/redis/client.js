'use strict';

import { promisify } from 'util';
import redis from '../db/redis';

/**
 * set key obj to redis
 * @param {String} key key
 * @param {Object} obj obj
 * @returns {Promise<boolean>} return promise
 */
const set = async (key, obj) => {
  const client = redis();
  const setAsync = promisify(client.set).bind(client);
  const newKey = toString(key);
  const newObj = JSON.stringify(obj);
  await setAsync(newKey, newObj);
  return true;
};

/**
 * get obj for key form redis
 * @param {String} key key
 * @returns {Promise<*|*>} return promise
 */
const get = async (key) => {
  const client = redis();
  const getAsync = promisify(client.get).bind(client);
  const newKey = toString(key);
  let data = await getAsync(newKey);
  data = JSON.parse(data);
  return data;
};

export default {
  set,
  get,
};
