import log4js from 'log4js'

log4js.configure({
  appenders: {
    /*
     *    file: {
     *      type: 'file',
     *      filename: 'logs/main.log',
     *      maxLogSize: 20480,
     *      backups: 10,
     *    },
     */
    console: {
      type: 'stdout',
    },
  },
  categories: {
    development: {
      appenders: ['console'],
      level: 'all',
    },
    production: {
      appenders: ['console'],
      level: 'info',
    },
    default: {
      appenders: ['console'],
      level: 'info',
    },
  },
})
const logger = ['development','production'].includes(process.env.NODE_ENV) ? 
  log4js.getLogger(process.env.NODE_ENV) : 
  log4js.getLogger('default')

export default logger
