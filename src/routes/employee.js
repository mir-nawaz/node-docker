import express from 'express';
import async from '../util/async';
import validate from '../util/validate';
import Employee from '../controllers/employee';

const employee = new Employee();
const router = express.Router();

router.get('/', [], validate, async(employee.index));

router.get('/refresh', [], validate, async(employee.refresh));

export default router;
