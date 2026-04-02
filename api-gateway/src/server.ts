import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import orderRoutes from "./routes/order.routes";
import cors from "cors"
import { addRequestId } from "./middlewares/req.id";
import { requestLogger } from "./middlewares/req.logger";
import { responseLogger } from "./middlewares/res.logger";
import rateLimit from "express-rate-limit";
import { MAX_REQUEST_COUNT, RATE_LIMIT_INTERVAL, TOO_MANY_REQUEST } from "./utils/constants";

dotenv.config()

const app = express()

app.use(rateLimit({
  windowMs: RATE_LIMIT_INTERVAL,
  max: MAX_REQUEST_COUNT, 
  message: TOO_MANY_REQUEST,
}))

app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use(addRequestId)

app.use(requestLogger)
app.use(responseLogger)

app.use("/user-service", userRoutes)
app.use("/order-service", orderRoutes)

app.get("/", (req, res) => {
  res.send("Api gateway...")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`api gateway running on http://localhost:${PORT}`)
});