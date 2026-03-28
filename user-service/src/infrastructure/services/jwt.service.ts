import jwt from "jsonwebtoken"

export class JwtTokenService {

    signToken(userId : string) : string {
        return jwt.sign({ userId } , process.env.JWT_SECRET as string , {expiresIn : "1h"})
    }
}