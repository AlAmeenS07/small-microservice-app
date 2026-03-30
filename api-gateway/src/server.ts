import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";

dotenv.config()

const app = express()

app.use(cookieParser())

app.use("/user-service" , userRoutes)

app.get("/", (req, res) => {
  res.send("Api gateway...")
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`api gateway running on http://localhost:${PORT}`)
});