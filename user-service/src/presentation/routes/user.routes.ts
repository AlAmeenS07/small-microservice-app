import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const controller = new UserController();


router.get("/me" , controller.getMyData)
router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/" , controller.getAllUsers);
router.get("/:id" , controller.getUser);
router.post("/logout" , controller.logout);


export default router;