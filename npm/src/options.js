import { LOGGING_TRACE_KEY, LoggingBunyan } from '@google-cloud/logging-bunyan'
import { create, serializers } from 'bunyan-debug-stream'

export let loggerOption
export let traceKey

const name = process.env.CLOUD_RUN_JOB || process.env.K_SERVICE

if (name) {
  loggerOption = {
    name: 'local',
    streams: [
      {
        level: 'debug',
        type: 'raw',
        stream: create({
          forceColor: true
        })
      }
    ],
    serializers
  }
  traceKey = LOGGING_TRACE_KEY
  const level = process.env.LOG_LEVEL || 'info'

  // Creates a Bunyan Cloud Logging client
  const loggingBunyan = new LoggingBunyan()

  // Create a Bunyan logger that streams to Cloud Logging
  // Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
  loggerOption = {
    // The JSON payload of the log as it appears in Cloud Logging
    // will contain "name": "catalina-job-sync-from-b2b"
    name,
    streams: [
      // Log to the console at 'info' and above
      { stream: process.stdout, level },
      // And log to Cloud Logging, logging at 'info' and above
      loggingBunyan.stream(level)
    ]
  }
} else {
  loggerOption = {
    name: 'local',
    streams: [
      {
        level: 'debug',
        type: 'raw',
        stream: create({
          forceColor: true
        })
      }
    ],
    serializers
  }
}

// The source file, line and function of the log call site can be added to log
if (process.env.SHOW_SOURCE) {
  loggerOption.src = true
}
