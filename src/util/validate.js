import { validationResult } from 'express-validator';

/**
 * express validate request
 * @param {Request} req req
 * @param {Response} res res
 * @param {Next} next next
 * @returns {*} Function
 */
export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = {};
    // eslint-disable-next-line
    errors.array().map((err) => error[err.param] = err.msg);
    return res.status(422).json({ error });
  }

  return next();
};
