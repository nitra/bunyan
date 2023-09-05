import bunyan from 'bunyan'
import { loggerOption, traceKey } from './options.js'
import { getProjectId } from '@nitra/gcp-metadata'

let log = bunyan.createLogger(loggerOption)

if (traceKey) {
  // const projectId = await getProjectId()

  // Для Binary - Top-level await is currently not supported with the "cjs" output format
  getProjectId().then(projectId => {
    log = log.child({ [traceKey]: `projects/${projectId}/traces/${process.env.CLOUD_RUN_EXECUTION}` }, true)
  })
}

export default log
