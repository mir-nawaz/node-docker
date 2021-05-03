import express from 'express';
import { check } from 'express-validator';
import async from '../util/async';
import Project from '../controllers/project';
import validate from '../util/validate';
import constants from '../config/constants';
import estimateUtil from '../util/estimate';

const router = express.Router();
const project = new Project();

const projectValidations = [
  check('name').not().isEmpty().isString()
    .withMessage('name: value required.'),
  check('owner').not().isEmpty().isString()
    .withMessage('owner: value required.'),
  check('state').not().isEmpty().isIn(constants.project.state)
    .withMessage(`state: value required from ${constants.project.state}`),
  check('participants').isArray()
    .withMessage('participants: value required.'),
  check('participants.*.id').not().isEmpty().isString()
    .withMessage('participants.id: value required.'),
  check('participants.*.estimate').not().isEmpty().isNumeric()
    .withMessage('participants.estimate: value required.'),
  check('participants.*.status').not().isEmpty().isNumeric()
    .withMessage('participants.status: value required.'),
  check('participants.*.estimate').custom(estimateUtil)
    .withMessage('status should be less estimate'),
];

router.get('/', [
  check('skip').not().isEmpty().isInt({ gt: -1 })
    .withMessage('skip: positive numeric value required.'),
  check('limit').not().isEmpty().isInt({ gt: -1 })
    .withMessage('limit: positive numeric value required.'),
], validate, async(project.index));

router.post('/', projectValidations, validate, async(project.store));

router.put('/:id', projectValidations, validate, async(project.update));

export default router;
