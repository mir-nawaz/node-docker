import log from './logger';

const respond = {
  /**
   * send success response
   * @param {Response} res res
   * @param {Object} message message
   * @param {Array|Object} data data
   * @returns {*} done
   */
  success: (res, message, data = null) => {
    const responseMessage = {
      code: message.code ? message.code : 200,
      success: true,
      message: message.message,
    };
    if (data) { responseMessage.data = data; }
    return res.status(responseMessage.code).json(responseMessage);
  },
  /**
   * send error response
   * @param {Response} res res
   * @param {Object} error error
   * @returns {*} done
   */
  error: (res, error) => {
    const responseMessage = {
      code: error.code ? error.code : 500,
      success: false,
      message: error.message,
    };
    log.error('Error response ', responseMessage);
    return res.status(responseMessage.code).json(responseMessage);
  },
};

export default respond;
