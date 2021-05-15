import log from './logger';

/**
 * shutdown server
 * @param {http.Server} server server
 */
function shutdown(server) {
  server.close((err) => {
    if (err) {
      log.error(err);
      process.exitCode = 1;
    }
    process.exit();
  });
}

/**
 * Server control
 */
class Control {
  server;

  /**
   * constructor
   * @param {http.Server} server server
   */
  constructor(server) {
    this.server = server;
    process.on('SIGINT', () => this.sigint(server));
    // quit properly on docker stop
    process.on('SIGTERM', () => this.sigterm(server));
  }

  /**
   * sign int
   * @param {http.Server} server server
   */
  sigint(server) {
    log.info('Got SIGINT (aka ctrl-c). Graceful shutdown ', new Date().toISOString());
    shutdown(server);
  }

  /**
   * sign term
   * @param {http.Server} server server
   */
  sigterm(server) {
    log.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
    shutdown(server);
  }
}

export default Control;
