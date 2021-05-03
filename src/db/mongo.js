import database from '../models';
import config from '../config';

const connect = async () => database.mongoose.connect(config.database(), config.dbParams);

export default connect;
