import { Router } from "express";
import { OrderController } from "../controller/order.controller";
import { OrderRepository } from "../../infrastructure/repository/order.repository";
import { OrderById } from "../../application/use-cases/order.by.id";
import { OrderCreate } from "../../application/use-cases/order.create";
import { UserDataService } from "../../infrastructure/services/user.service";
import { AllOrdersOfUser } from "../../application/use-cases/orders.of.user";

const router = Router()

const orderRepo = new OrderRepository()
const extUserService = new UserDataService()

const orderById = new OrderById(orderRepo)
const orderCreate = new OrderCreate(orderRepo, extUserService)
const ordersByUserId = new AllOrdersOfUser(orderRepo)

const orderController = new OrderController(orderById , orderCreate , ordersByUserId)

router.post("/" , orderController.createOrder)
router.get("/:id" , orderController.getOrderById)
router.get("/" , orderController.allOrdersOfUser)

export default router