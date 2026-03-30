import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const controller = new UserController();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/" , controller.getAllUsers);
router.get("/:id" , controller.getUser);


export default router;