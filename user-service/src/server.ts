import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/mongoose"
import userRoutes from "./presentation/routes/user.routes"
import { requestLogger } from "./presentation/middlewares/req.logger"
import { responseLogger } from "./presentation/middlewares/res.logger"

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use(requestLogger)
app.use(responseLogger)

app.use("/api/v1/user" , userRoutes)

app.get("/" , (req , res)=>{
    res.send("User Service...")
})

const PORT = process.env.PORT || 5001

app.listen(PORT , ()=>{
    console.log(`user service running on http://localhost:${PORT}`)
})