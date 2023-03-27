import bunyan from 'bunyan'
import { loggerOption, traceKey } from './options.js'
import gcpMetadata from 'gcp-metadata'

const log = bunyan.createLogger(loggerOption)

let projectId
if (traceKey) {
  projectId = await gcpMetadata.project('project-id')
}

export default log.child({ [traceKey]: `projects/${projectId}/traces/${process.env.CLOUD_RUN_EXECUTION}` }, true)
