import express from "express";
import dotenv from "dotenv";
import orderRoutes from "./presentation/routes/order.routes";
import { requestLogger } from "./presentation/middleware/req.logger";
import { responseLogger } from "./presentation/middleware/res.logger";

dotenv.config()

const app = express()
app.use(express.json())

app.use(requestLogger)
app.use(responseLogger)

app.use("/api/v1/order" , orderRoutes)

app.get("/" , (req , res)=>{
    res.send("Order service...")
})

const PORT = process.env.PORT || 5002


app.listen(PORT , ()=>{
    console.log(`Order service running on http://localhost:${PORT}`)
})