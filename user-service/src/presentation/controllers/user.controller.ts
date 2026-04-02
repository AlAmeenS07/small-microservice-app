import { Request, Response } from "express";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { UserRegister } from "../../application/use-cases/user.register";
import { BcryptPasswordService } from "../../infrastructure/services/bcypt.password";
import { JwtTokenService } from "../../infrastructure/services/jwt.service";
import { UserLogin } from "../../application/use-cases/user.login";
import { COOKIE_NAME, CREATED, FETCHED_ALL_USERS, INVALID_EMAIL, MISSING_FIELDS, NAME_MUST_BE_THREE_LETTERS, NOT_FOUND, PASSWORD_MUST_BE_SIX_LETTERS, SERVER_ERROR, SIX, SUCCESS, THREE, USER_FETCHED_SUCCESSFULLY, USER_LOGIN_SUCCESSFULLY, USER_LOGOUT_SUCCESSFULLY, USER_NOT_FOUND_WITH_ID, USER_REGISTERED_SUCCESSFULLY } from "../../utils/constatns";
import { AllUsers } from "../../application/use-cases/all.users";
import { GetUserById } from "../../application/use-cases/get.user";
import logger from "../../config/logger";


const userRepo = new UserRepository()
const bcryptService = new BcryptPasswordService()
const jwtService = new JwtTokenService()

const userRegister = new UserRegister(userRepo, bcryptService)
const userLogin = new UserLogin(userRepo, bcryptService, jwtService)
const getAllUsers = new AllUsers(userRepo)
const getUserById = new GetUserById(userRepo)


export class UserController {

    async register(req: Request, res: Response) {

        const requestId = req.headers["x-request-id"]

        try {

            const { name, email, password } = req.body

            if (name.trim() == "" || email.trim() == "" || password.trim() == "") {
                throw new Error(MISSING_FIELDS);
            }

            if(name.length < THREE){
                throw new Error(NAME_MUST_BE_THREE_LETTERS);
                
            }

            if (!email.includes("@")) {
                throw new Error(INVALID_EMAIL);
            }

            if(password.length < SIX){
                throw new Error(PASSWORD_MUST_BE_SIX_LETTERS);
            }

            const user = await userRegister.execute(name, email, password)

            res.status(CREATED).json({
                success: true,
                message: USER_REGISTERED_SUCCESSFULLY,
                data: user
            })

        } catch (error: any) {

            logger.error({
                service: "user-service",
                requestId,
                message: error.message,
            })

            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async login(req: Request, res: Response) {

        const requestId = req.headers["x-request-id"]

        try {            

            const { email, password } = req.body

            if( email.trim() == "" || password.trim() == ""){
                throw new Error(MISSING_FIELDS)
            }

            if(!email.includes("@")){
                throw new Error(INVALID_EMAIL);
            }

            const { token, user } = await userLogin.execute(email, password)

            res.cookie(COOKIE_NAME, token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
                maxAge: Number(process.env.COOKIE_AGE)
            })

            res.status(SUCCESS).json({
                success: true,
                message: USER_LOGIN_SUCCESSFULLY,
                data: user
            })

        } catch (error: any) {

            logger.error({
                service: "user-service",
                requestId,
                message: error.message,
            })

            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async logout(req: Request, res: Response) {

        const requestId = req.headers["x-request-id"]

        try {

            res.clearCookie(COOKIE_NAME, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
                maxAge: Number(process.env.COOKIE_AGE)
            })

            res.status(SUCCESS).json({
                success: true,
                message: USER_LOGOUT_SUCCESSFULLY
            })

        } catch (error: any) {
        
            logger.error({
                service: "user-service",
                requestId,
                message: error.message,
            })

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

            if (!user) {
                return res.status(NOT_FOUND).json({
                    success: false,
                    message: USER_NOT_FOUND_WITH_ID
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

    async getMyData(req: Request, res: Response) {

        const requestId = req.headers["x-request-id"]

        try {

            let userId = req.headers["x-user-id"] as string

            if (!userId) {
                throw new Error(USER_NOT_FOUND_WITH_ID);
            }

            let user = await getUserById.execute(userId as string)

            if (!user) {
                return res.status(NOT_FOUND).json({
                    success: false,
                    message: USER_NOT_FOUND_WITH_ID
                })
            }

            res.status(SUCCESS).json({
                success: true,
                message: USER_FETCHED_SUCCESSFULLY,
                data: user
            })

        } catch (error: any) {

            logger.error({
                service: "user-service",
                requestId,
                message: error.message,
            })

            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

}