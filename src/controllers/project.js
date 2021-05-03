import { find } from 'lodash';
import log from '../util/logger';
import db from '../models';
import employee from './employee';
import constants from '../config/constants';
import respond from '../util/respond';
import messages from '../config/messages';

const Project = db.project;

const LIMIT = 10;
const SKIP = 0;

/**
 * Project Controller
 */
class ProjectCtl {
  /**
   * get list from database
   * @param {Request} req req
   * @param {Response} res res
   * @returns {Promise<void>} void
   */
  async index(req, res) {
    log.info('project - search start ', req.query);
    let { skip, limit } = req.query;
    skip = Number(skip) || SKIP;
    limit = Number(limit) || LIMIT;
    const query = {};

    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .skip(skip)
      .limit(limit)
      .sort('createdAt')
      .select('-__v -createdAt -updatedAt');

    log.info('project - search complete');
    respond.success(res, messages.PROJECT_CREATED, {
      total, skip, limit, projects,
    });
  }

  /**
   * create a project in database
   * @param {Request} req req
   * @param {Response} res res
   * @returns {Promise<void>} void
   */
  async store(req, res) {
    log.info('project - create start ', req.body);

    const validated = await ProjectCtl.validateBody(res, req.body);
    if (!validated) return;

    const projectModel = new Project(req.body);
    const dbProj = await projectModel.save(projectModel);

    log.info('project - create complete ');
    respond.success(res, messages.PROJECT_CREATED, dbProj);
  }

  /**
   * update project in database
   * @param {Request} req req
   * @param {Response} res res
   * @returns {Promise<void>} void
   */
  async update(req, res) {
    log.info('project - update start ', { ...req.body, ...req.params });

    const { id } = req.params;
    const validated = await ProjectCtl.validateBody(res, req.body, id);
    if (!validated) return;

    const validObj = db.mongoose.Types.ObjectId.isValid(id);
    if (!validObj) {
      respond.error(res, messages.INVALID_ID);
      return;
    }

    const obj = await Project.findById(id);
    if (!obj) {
      respond.error(res, messages.ID_NOT_FOUND);
      return;
    }

    const newObj = await Project.findByIdAndUpdate(id, req.body);
    log.info('project - update complete ');
    respond.success(res, messages.PROJECT_UPDATED, newObj);
  }

  /**
   * validate request body
   * @param {Response} res response
   * @param {Request.body} body body
   * @param {String|Null} id id
   * @returns {Promise<boolean>} bool
   */
  static async validateBody(res, body, id = null) {
    const query = { name: body.name };
    /* eslint-disable no-underscore-dangle */
    if (id !== null) query._id = { $ne: id };

    const [owner, employees, projExists] = await Promise.all([
      employee.detail(body.owner),
      employee.list(),
      Project.find(query).select('_id'),
    ]);
    const { department } = owner;

    if (projExists.length) {
      respond.error(res, messages.PROJECT_EXISTS);
      return false;
    }

    if (!owner || owner.role !== constants.owner) {
      respond.error(res, messages.INVALID_OWNER);
      return false;
    }

    const participants = body.participants || [];
    for (const participant of participants) {
      const partiExists = find(employees.data, { id: participant.id });
      if (!partiExists || partiExists.department !== department) {
        respond.error(res, messages.INVALID_PARTICIPANT);
        return false;
      }
    }
    return true;
  }
}

export default ProjectCtl;
