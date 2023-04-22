import bunyan from 'bunyan'
import { loggerOption, traceKey } from './options.js'
import { getProjectId } from '@nitra/gcp-metadata'

const log = bunyan.createLogger(loggerOption)

let logE
if (traceKey) {
  const projectId = await getProjectId()
  logE = log.child({ [traceKey]: `projects/${projectId}/traces/${process.env.CLOUD_RUN_EXECUTION}` }, true)
} else {
  logE = log
}

export default logE
