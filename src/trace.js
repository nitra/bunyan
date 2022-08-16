import bunyan from 'bunyan'
import { loggerOption, traceKey } from './options.js'
import gcpMetadata from 'gcp-metadata'

const projectId = await gcpMetadata.project('project-id')
// TODO:
console.log('Detected project id:', projectId)

export default req => {
  if (traceKey) {
    // TODO:
    console.log('Dheders:', req.headers)

    const traceHeader = req && req.headers ? req.headers['x-cloud-trace-context'] || '' : ''
    const traceId = traceHeader ? traceHeader.split('/')[0] : ''

    // TODO:
    console.log('traceId:', traceId)

    if (traceId) {
      loggerOption[traceKey] = `projects/${projectId}/traces/${traceId}`
    }
  }

  return bunyan.createLogger(loggerOption)
}
