import pino from 'pino'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  base: {
    env: process.env.NODE_ENV,
  },
})

export const logError = (error: Error, context = {}) => {
  logger.error({ ...context, error: error.message, stack: error.stack })
}

export const logInfo = (message: string, context = {}) => {
  logger.info({ ...context, message })
}

export default logger
