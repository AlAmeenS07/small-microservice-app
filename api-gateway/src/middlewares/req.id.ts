import { v4 as uuidv4 } from "uuid"

export const addRequestId = (req: any, res: any, next: any) => {
  const requestId = uuidv4()

  req.requestId = requestId

  // 🔥 VERY IMPORTANT: send to other services
  req.headers["x-request-id"] = requestId

  next()
}