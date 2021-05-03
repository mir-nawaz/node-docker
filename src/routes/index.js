import express from 'express';
import project from './project';
import employee from './employee';

export default (app) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.status(200).send('Welcome to the API.');
  });

  // project routes
  router.use('/project', project);

  // employee routes
  router.use('/employee', employee);

  // global prefix for routes api
  app.use('/api', router);
};
