import { Request, Response } from "express";
import { AMOUNT_MUST_BE_GREATERTHAN_ZERO, CREATED, NOT_FOUND, ORDER_CREATED_SUCCESSFULLY, ORDER_FETCHED_SUCCESSFULLY, ORDER_NOT_FOUND_WITH_ID, SERVER_ERROR, SUCCESS, USER_NOT_FOUND } from "../../utils/constants";
import { OrderCreate } from "../../application/use-cases/order.create";
import { OrderRepository } from "../../infrastructure/repository/order.repository";
import { UserDataService } from "../../infrastructure/services/user.service";
import { OrderById } from "../../application/use-cases/order.by.id";
import { AllOrdersOfUser } from "../../application/use-cases/orders.of.user";


const orderRepo = new OrderRepository()
const extUserService = new UserDataService()

const orderCreate = new OrderCreate(orderRepo, extUserService)
const orderById = new OrderById(orderRepo)
const ordersByUserId = new AllOrdersOfUser(orderRepo)

export class OrderController {

    async createOrder(req: Request, res: Response) {
        try {

            const userId = req.headers["x-user-id"] as string

            const { amount } = req.body

            if (amount <= 0) {
                throw new Error(AMOUNT_MUST_BE_GREATERTHAN_ZERO);
            }

            if (!userId) {
                throw new Error(USER_NOT_FOUND);
            }

            let order = await orderCreate.execute(userId, Number(amount))

            res.status(CREATED).json({
                success: true,
                message: ORDER_CREATED_SUCCESSFULLY,
                data: order
            })

        } catch (error: any) {
            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async getOrderById(req: Request, res: Response) {
        try {

            let orderId = req.params.id

            let order = await orderById.execute(Number(orderId))

            if (!order) {
                return res.status(NOT_FOUND).json({
                    success: false,
                    message: ORDER_NOT_FOUND_WITH_ID
                })
            }

            res.status(SUCCESS).json({
                success: true,
                message: ORDER_FETCHED_SUCCESSFULLY,
                data: order
            })

        } catch (error: any) {
            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async allOrdersOfUser(req: Request, res: Response) {
        try {

            let userId = req.headers["x-user-id"] as string

            if(!userId){
                throw new Error(USER_NOT_FOUND);
            }

            let orders = await ordersByUserId.execute(userId)

            res.status(SUCCESS).json({
                success : true,
                message : ORDER_FETCHED_SUCCESSFULLY,
                data : orders
            })

        } catch (error : any) {
            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

}