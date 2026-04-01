import { Router } from "express";
import { OrderController } from "../controller/order.controller";

const router = Router()

const orderController = new OrderController()

router.post("/" , orderController.createOrder)
router.get("/:id" , orderController.getOrderById)
router.get("/" , orderController.allOrdersOfUser)

export default router