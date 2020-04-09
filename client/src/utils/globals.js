import ulog from 'ulog';
const log = ulog('App');

    /* Based on the environment, you can setup log level.
    * For DEVELOPMENT_MODE: LOG_LEVEL is set to 5 which is debug log level
    * For PRODUCTION_MODE: LOG_LEVEL is set to 1 which is error log level
    * For more info please read GETTING_STARTED.md file.
    * */

    log.level = process.env.LOG_LEVEL;


export default log;
