import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authCheck } from "../middlewares/auth.check";


const router = Router()


router.use("/auth" , 
    createProxyMiddleware({
        target : "http://localhost:5001",
        changeOrigin : true,
    })
)

router.use("/user" , 
    authCheck,
    createProxyMiddleware({
        target : "http://localhost:5001",
        changeOrigin : true
    })
)


export default router