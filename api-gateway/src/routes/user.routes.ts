import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authCheck } from "../middlewares/auth.check";


const router = Router()


router.use("/auth",
    createProxyMiddleware({
        target: "http://user-service:5001",
        changeOrigin: true,

        on: {
            proxyReq: (proxyReq: any, req: any) => {
                if (req.requestId) {
                    proxyReq.setHeader("x-request-id", req.requestId)
                }
            }
        }


    })
)

router.use("/user",
    authCheck,
    createProxyMiddleware({
        target: "http://user-service:5001",
        changeOrigin: true,

        on: {
            proxyReq: (proxyReq: any, req: any) => {
                if (req.userId && req.requestId) {
                    proxyReq.setHeader("x-user-id", req.userId)
                    proxyReq.setHeader("x-request-id", req.requestId)
                }
            }
        }

    })
)


export default router