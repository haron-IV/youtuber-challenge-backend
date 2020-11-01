import { createLogger, format, transports } from 'winston'

const customFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} | ${level}: ${message}`;
});

const customFormatFile = format.printf(({ level, message, timestamp }) => {
  return `{timestamp: "${timestamp}", level: "${level}",  message: "${message}"}`;
});

const logger = createLogger({
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 20,
      filename: `logs/logs.log`,
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD ( HH:mm:ss )'
        }),
        customFormatFile
      )
    }),
    new transports.Console({
      level: "debug",
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'YYYY-MM-DD ( HH:mm:ss )'
        }),
        customFormat
      )
    })
  ]
})

export { logger }