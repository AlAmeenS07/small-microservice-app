import logger from "../../config/logger"

export const requestLogger = (req: any, res: any, next: any) => {
  const requestId = req.headers["x-request-id"]

  logger.info({
    service: "user-service", // change per service
    requestId,
    method: req.method,
    url: req.originalUrl,
  })

  next()
}