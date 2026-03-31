import { NextFunction, Request, Response } from "express";
import { FORBIDDEN, UNAUTHORIZED, UNAUTHORIZED_USER } from "../utils/constants";
import jwt, { JwtPayload } from "jsonwebtoken"


export function authCheck(req: Request, res: Response, next: NextFunction) {
    try {

        const token = req.cookies?.token

        if (!token) {
            return res.status(UNAUTHORIZED).json({
                success: false,
                message: UNAUTHORIZED_USER
            })
        }

        let decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload

        if (!decoded.userId) {
            return res.status(UNAUTHORIZED).json({
                success: false,
                message: UNAUTHORIZED_USER
            })
        }

        (req as any).userId = decoded.userId

        next()

    } catch (error : any) {
        res.status(FORBIDDEN).json({
            success : false,
            message : error.message
        })
    }
}