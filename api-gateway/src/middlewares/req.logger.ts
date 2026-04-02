import logger from "../config/logger"

export const requestLogger = (req: any, res: any, next: any) => {
  logger.info({
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl,
  })

  next()
}