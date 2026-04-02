import { NextFunction, Request, Response } from "express"
import logger from "../config/logger"

export const responseLogger = (req: any, res: Response, next: NextFunction) => {
  
    res.on("finish", () => {
    logger.info({
      requestId: req.requestId,
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
    })
  })

  next()
}