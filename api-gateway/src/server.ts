import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import orderRoutes from "./routes/order.routes";
import cors from "cors"

dotenv.config()

const app = express()

app.use(cookieParser())
app.use(cors({
  origin : "http://localhost:5173",
  credentials : true
}))

app.use("/user-service" , userRoutes)
app.use("/order-service" , orderRoutes)

app.get("/", (req, res) => {
  res.send("Api gateway...")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`api gateway running on http://localhost:${PORT}`)
});