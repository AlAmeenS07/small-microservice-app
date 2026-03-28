import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { UserRegister } from "../../application/use-cases/user.register";
import { BcryptPasswordService } from "../../infrastructure/services/bcypt.password";
import { JwtTokenService } from "../../infrastructure/services/jwt.service";
import { UserLogin } from "../../application/use-cases/user.login";
import { CREATED, SERVER_ERROR, SUCCESS, USER_LOGIN_SUCCESSFULLY, USER_REGISTERED_SUCCESSFULLY } from "../../utils/constatns";


const userRepo = new UserRepository()
const bcryptService = new BcryptPasswordService()
const jwtService = new JwtTokenService()

const userRegister = new UserRegister(userRepo, bcryptService)
const userLogin = new UserLogin(userRepo, bcryptService, jwtService)


export class UserController {

    async register(req: Request, res: Response) {
        try {

            const { name, email, password } = req.body

            const user = await userRegister.execute(name, email, password)

            res.status(CREATED).json({
                success: true,
                message: USER_REGISTERED_SUCCESSFULLY,
                data: user
            })

        } catch (error: any) {
            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async login(req: Request, res: Response) {
        try {

            const { email , password } = req.body

            const token = await userLogin.execute(email , password)

            res.status(SUCCESS).json({
                success : false,
                message : USER_LOGIN_SUCCESSFULLY,
                data : {
                    token
                }
            })

        } catch (error : any) {
            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

}