import pino from 'pino'
import pretty from 'pino-pretty'
import config from '../../main/config/config'

const loggerConfig = config.logger

const logger = pino({
  enabled: loggerConfig.enable,
  level: loggerConfig.level
}, pretty({
  colorize: loggerConfig.pretty.colorize,
  levelFirst: loggerConfig.pretty.levelFirst,
  translateTime: loggerConfig.pretty.translateTime
}))

export { logger }
