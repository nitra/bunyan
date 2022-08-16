import bunyan from 'bunyan'

let loggerOption

if (process.env.K_SERVICE) {
  // Imports the Google Cloud client library for Bunyan
  const { LoggingBunyan, LOGGING_TRACE_KEY } = await import('@google-cloud/logging-bunyan')
  // const traceHeader = req && req.headers ? req.headers['x-cloud-trace-context'] || '' : '';
  // const traceId = traceHeader ? traceHeader.split('/')[0] : '';

  // Creates a Bunyan Cloud Logging client
  const loggingBunyan = new LoggingBunyan()

  // Create a Bunyan logger that streams to Cloud Logging
  // Logs will be written to: "projects/YOUR_PROJECT_ID/logs/bunyan_log"
  loggerOption = {
    // The JSON payload of the log as it appears in Cloud Logging
    // will contain "name": "catalina-job-sync-from-b2b"
    name: process.env.CLOUD_RUN_JOB || process.env.K_SERVICE,
    foo: 'bar',
    streams: [
      // Log to the console at 'info' and above
      { stream: process.stdout, level: 'info' },
      // And log to Cloud Logging, logging at 'info' and above
      loggingBunyan.stream('info')
    ]
  }

  loggerOption[LOGGING_TRACE_KEY] = '123'
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

export default bunyan.createLogger(loggerOption)
