import request from 'request';
import { cloneDeep } from 'lodash';
import constants from '../config/constants';

const asyncRequest = (options) => new Promise((resolve, reject) => {
  request(options, (error, response) => {
    if (error) reject(error);
    const body = JSON.parse(response.body);
    resolve(body);
  });
});

export default {
  /**
   * get employees list
   * @returns {Promise<Response>} response
   */
  list: async () => asyncRequest(constants.employee),
  /**
   * Get employee details
   * @param {String} id id
   * @returns {Promise<Response>} response
   */
  detail: async (id) => {
    const options = cloneDeep(constants.employee);
    options.url = `${options.url}/${id}`;

    return asyncRequest(options);
  },
};
