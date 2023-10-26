import Config from '~/config'

const logLevel = Config.get('LOG_LEVEL') || 'debug'

function log(msg: string) {
  if (logLevel === 'debug') {
    console.log(msg)
    // writeToLogFile(msg)
  }
}

log.warn = (msg: string) => {
  if (logLevel === 'debug') {
    console.warn(msg)
    // writeToLogFile(msg, 'warn')
  }
}

log.error = (msg: string) => {
  if (logLevel === 'debug' || logLevel === 'error') {
    console.error(msg)
  }
}

export default log
