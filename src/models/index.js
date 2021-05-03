import mongoose from 'mongoose';
import config from '../config';
import project from './project';

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = config.database();
db.project = project(mongoose);

mongoose.set('useCreateIndex', true);
export default db;
