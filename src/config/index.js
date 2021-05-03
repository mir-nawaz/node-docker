import dotenv from 'dotenv';
import log from '../util/logger';

const config = {
  port: process.env.PORT || 8080,
  /**
   * load config
   */
  connect: () => {
    const env = process.env.PROCESS_ENV;
    const path = env !== undefined
      ? `.${env}.env`
      : '.env';
    log.info(`Loading configurations from '${path}' `);
    dotenv.config({ path });
  },
  /**
   * load database config
   * @returns {string} config
   */
  database: () => {
    const host = process.env.DB_HOST;
    const user = process.env.DB_USER;
    const password = process.env.DB_PASS;
    const port = process.env.DB_PORT;
    const name = process.env.DB_NAME;

    return (!user || !password)
      ? `mongodb://${host}:${port}/${name}`
      : `mongodb://${user}:${password}@${host}:${port}/${name}`;
  },
  /**
   * load redis config
   * @returns {{enable_offline_queue: boolean, port: *, host: *,
   * auth_pass: *, user: *, db: *, url: string}} obj
   */
  redis: () => {
    const host = process.env.REDIS_HOST;
    /* eslint-disable camelcase */
    const auth_pass = process.env.DB_PASS;
    const user = process.env.REDIS_USER;

    const url = (!auth_pass || !user)
      ? `redis://${host}:6379`
      : `redis://${user}:${auth_pass}@${host}:6379`;

    return {
      host: process.env.REDIS_HOST,
      port: process.env.DB_PORT,
      auth_pass,
      user,
      db: process.env.REDIS_DB,
      url,
      enable_offline_queue: true,
    };
  },
  dbParams: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true, // build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
  },
  /**
   * load express session config
   * @returns {{proxy: boolean, saveUninitialized: boolean, name: *,
   * secret: *, resave: boolean}} obj
   */
  sessionOptions: () => ({
    secret: process.env.COOKIE_NAME,
    name: process.env.COOKIE_NAME,
    // store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true,
  }),
};

export default config;
