import { Router } from "express";
import { OrderController } from "../controller/order.controller";

const router = Router()

const orderController = new OrderController()

router.post("/" , orderController.createOrder)
router.get("/:id" , orderController.getOrderById)

export default router