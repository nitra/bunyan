export let loggerOption
export let traceKey

const name = process.env.CLOUD_RUN_EXECUTION || process.env.CLOUD_RUN_JOB || process.env.K_SERVICE
console.log('name', name)
if (name) {
  // Imports the Google Cloud client library for Bunyan
  const { LoggingBunyan, LOGGING_TRACE_KEY } = await import('@google-cloud/logging-bunyan')
  traceKey = LOGGING_TRACE_KEY
  console.log('traceKey', traceKey)
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
      // { stream: process.stdout, level: 'info' },
      // And log to Cloud Logging, logging at 'info' and above
      loggingBunyan.stream('info')
    ]
  }
} else {
  const { create, serializers } = await import('bunyan-debug-stream')

  loggerOption = {
    name: 'local',
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

// The source file, line and function of the log call site can be added to log
if (process.env.SHOW_SOURCE) {
  loggerOption.src = true
}
