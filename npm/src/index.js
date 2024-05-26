import bunyan from 'bunyan'
import { loggerOption } from './options.js'

export default bunyan.createLogger(loggerOption)
