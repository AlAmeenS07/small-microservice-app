import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { UserRegister } from "../../application/use-cases/user.register";
import { BcryptPasswordService } from "../../infrastructure/services/bcypt.password";
import { JwtTokenService } from "../../infrastructure/services/jwt.service";
import { UserLogin } from "../../application/use-cases/user.login";
import { COOKIE_NAME, CREATED, FETCHED_ALL_USERS, INVALID_EMAIL, MISSING_FIELDS, NOT_FOUND, SERVER_ERROR, SUCCESS, USER_FETCHED_SUCCESSFULLY, USER_LOGIN_SUCCESSFULLY, USER_NOT_FOUND_WITH_ID, USER_REGISTERED_SUCCESSFULLY } from "../../utils/constatns";
import { AllUsers } from "../../application/use-cases/all.users";
import { GetUserById } from "../../application/use-cases/get.user";


const userRepo = new UserRepository()
const bcryptService = new BcryptPasswordService()
const jwtService = new JwtTokenService()

const userRegister = new UserRegister(userRepo, bcryptService)
const userLogin = new UserLogin(userRepo, bcryptService, jwtService)
const getAllUsers = new AllUsers(userRepo)
const getUserById = new GetUserById(userRepo)


export class UserController {

    async register(req: Request, res: Response) {
        try {

            const { name, email, password } = req.body

            if (!name || !email || !password) {
                throw new Error(MISSING_FIELDS);
            }

            if (!email.includes("@")) {
                throw new Error(INVALID_EMAIL);
            }

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

            const { email, password } = req.body

            const token = await userLogin.execute(email, password)

            res.cookie(COOKIE_NAME, token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
                maxAge: Number(process.env.COOKIE_AGE)
            })

            res.status(SUCCESS).json({
                success: true,
                message: USER_LOGIN_SUCCESSFULLY
            })

        } catch (error: any) {
            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {

            let users = await getAllUsers.execute()

            res.status(SUCCESS).json({
                success: true,
                message: FETCHED_ALL_USERS,
                data: users
            })

        } catch (error: any) {
            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async getUser(req: Request, res: Response) {
        try {

            let { id } = req.params

            let user = await getUserById.execute(id as string)

            if(!user){
                return res.status(NOT_FOUND).json({
                    success : false,
                    message : USER_NOT_FOUND_WITH_ID
                })
            }

            res.status(SUCCESS).json({
                success: true,
                message: USER_FETCHED_SUCCESSFULLY,
                data: user
            })

        } catch (error: any) {
            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

}