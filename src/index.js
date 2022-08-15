import bunyan from 'bunyan'

let loggerOption

if (process.env.K_SERVICE) {
  // Imports the Google Cloud client library for Bunyan
  const { LoggingBunyan } = await import('@google-cloud/logging-bunyan')
  // import { LoggingBunyan } from '@google-cloud/logging-bunyan'

  // Creates a Bunyan Cloud Logging client
  const loggingBunyan = new LoggingBunyan()

  // Create a Bunyan logger that streams to Cloud Logging
  // Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
  loggerOption = {
    // The JSON payload of the log as it appears in Cloud Logging
    // will contain "name": "catalina-job-sync-from-b2b"
    name: process.env.CLOUD_RUN_JOB,
    src: true,
    streams: [
      // Log to the console at 'info' and above
      { stream: process.stdout, level: 'info' },
      // And log to Cloud Logging, logging at 'info' and above
      loggingBunyan.stream('info')
    ]
  }
} else {
  const { create, serializers } = await import('bunyan-debug-stream')

  loggerOption = {
    name: 'local',
    src: true,
    streams: [
      {
        level: 'info',
        type: 'raw',
        stream: create({
          forceColor: true
        })
      }
    ],
    serializers
  }
}

export default bunyan.createLogger(loggerOption)
