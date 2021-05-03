import redis from '../redis/client';
import constants from '../config/constants';
import employeeUtil from '../util/employee';
import respond from '../util/respond';
import messages from '../config/messages';

/**
 * Employee Controller
 */
class EmployeeCtl {
  /**
   * get employee list
   * @param {Request} req req
   * @param {Response} res res
   * @returns {Promise<Object>} response
   */
  async index(req, res) {
    const employeeList = await EmployeeCtl.list();
    const data = employeeList.data || [];
    respond.success(res, messages.SUCCESS, data);
  }

  /**
   * refresh employee list in redis
   * @param {Request} req req
   * @param {Response} res res
   * @returns {Promise<void>} void
   */
  async refresh(req, res) {
    await EmployeeCtl.refreshRedis();
    respond.success(res, messages.SUCCESS, { refresh: 'success' });
  }

  /**
   * get employee details
   * @param {String} id id
   * @returns {Promise<Object>} obj
   */
  static async detail(id) {
    return employeeUtil.detail(id);
  }

  /**
   * refresh Redis Function
   * @returns {Promise<void>} void
   */
  static async refreshRedis() {
    const data = await employeeUtil.list();
    await redis.set(constants.redisEmployeeKey, data);
  }

  /**
   * get employee list
   * @returns {Promise<Array>} array
   */
  static async list() {
    return redis.get(constants.redisEmployeeKey);
  }
}

export default EmployeeCtl;
