import bunyan from 'bunyan'
import { loggerOption, traceKey } from './options.js'
import gcpMetadata from 'gcp-metadata'

const log = bunyan.createLogger(loggerOption)

let logE
if (traceKey) {
  const projectId = await gcpMetadata.project('project-id')
  logE = log.child({ [traceKey]: `projects/${projectId}/traces/${process.env.CLOUD_RUN_EXECUTION}` }, true)
} else {
  logE = log
}

export default logE
