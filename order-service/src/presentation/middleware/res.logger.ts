import logger from "../../config/logger"

export const responseLogger = (req: any, res: any, next: any) => {
  res.on("finish", () => {
    logger.info({
      service: "order-service",
      requestId: req.headers["x-request-id"],
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
    })
  })

  next()
}