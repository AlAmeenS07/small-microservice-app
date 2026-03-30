import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/mongoose"
import { logger } from "./config/logger"
import userRoutes from "./presentation/routes/user.routes"

dotenv.config()
connectDB()

const app = express()
app.use(express.json())


app.use("/api/v1/user" , userRoutes)

app.get("/" , (req , res)=>{
    res.send("User Service...")
})

const PORT = process.env.PORT || 5001

app.listen(PORT , ()=>{
    logger.info(`user service running on http://localhost:${PORT}`)
})