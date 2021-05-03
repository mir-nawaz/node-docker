import { get, split } from 'lodash';

/**
 * validate estimate and status of participant in project
 * @param {Number} estimate estimate
 * @param {Request} meta meta
 * @returns {boolean} bool
 */
export default (estimate, meta) => {
  const paths = split(meta.path, '.');
  const status = get(meta, `req.body.${paths[0]}.status`);
  return status <= estimate;
};
