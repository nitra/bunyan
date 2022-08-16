import bunyan from 'bunyan'
import { loggerOption, traceKey } from './options.js'
import gcpMetadata from 'gcp-metadata'

let projectId
if (traceKey) {
  projectId = await gcpMetadata.project('project-id')
}

export default req => {
  if (traceKey) {
    const traceHeader = req?.headers ? req.headers['x-cloud-trace-context'] || '' : ''
    const traceId = traceHeader ? traceHeader.split('/')[0] : ''

    if (traceId) {
      loggerOption[traceKey] = `projects/${projectId}/traces/${traceId}`
    }
  }

  return bunyan.createLogger(loggerOption)
}
