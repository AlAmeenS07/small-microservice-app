import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserLogin } from "../../application/use-cases/user.login";
import { UserRepository } from "../../infrastructure/repositories/user.repository";
import { BcryptPasswordService } from "../../infrastructure/services/bcypt.password";
import { JwtTokenService } from "../../infrastructure/services/jwt.service";
import { UserRegister } from "../../application/use-cases/user.register";
import { GetUserById } from "../../application/use-cases/get.user";
import { AllUsers } from "../../application/use-cases/all.users";

const router = Router();

const userRepo = new UserRepository()
const bcryptService = new BcryptPasswordService()
const jwtService = new JwtTokenService()

const loginUser = new UserLogin(userRepo , bcryptService , jwtService)
const userRegister = new UserRegister(userRepo, bcryptService)
const getUserById = new GetUserById(userRepo)
const getAllUsers = new AllUsers(userRepo)

const controller = new UserController(loginUser , userRegister , getUserById , getAllUsers);

router.get("/me" , controller.getMyData)
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/" , controller.getAllUsers);
router.get("/:id" , controller.getUser);
router.post("/logout" , controller.logout);


export default router;