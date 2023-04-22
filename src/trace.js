import { traceKey } from './options.js'
import log from './index.js'
import { getProjectId } from '@nitra/gcp-metadata'

let projectId
if (traceKey) {
  projectId = await getProjectId()
}

export default req => {
  if (traceKey) {
    const traceHeader = req?.headers ? req.headers['x-cloud-trace-context'] || '' : ''
    const traceId = traceHeader ? traceHeader.split('/')[0] : ''

    if (traceId) {
      return log.child({ [traceKey]: `projects/${projectId}/traces/${traceId}` }, true)
    }
  }

  return log
}
