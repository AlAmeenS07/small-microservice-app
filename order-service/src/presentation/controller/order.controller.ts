import { Request, Response } from "express";
import { AMOUNT_MUST_BE_GREATERTHAN_ZERO, CREATED, NOT_FOUND, ORDER_CREATED_SUCCESSFULLY, ORDER_FETCHED_SUCCESSFULLY, ORDER_NOT_FOUND_WITH_ID, SERVER_ERROR, SUCCESS, USER_NOT_FOUND } from "../../utils/constants";
import { IOrderCreate } from "../../application/use-cases/order.create";
import { IOrderById } from "../../application/use-cases/order.by.id";
import { IAllOrdersOfUsers } from "../../application/use-cases/orders.of.user";
import logger from "../../config/logger";


export class OrderController {

    constructor(
        private _orderById : IOrderById,
        private _orderCreate : IOrderCreate,
        private _allOrdersOfUser : IAllOrdersOfUsers
    ){}

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

            let order = await this._orderCreate.execute(userId, Number(amount))

            res.status(CREATED).json({
                success: true,
                message: ORDER_CREATED_SUCCESSFULLY,
                data: order
            })

        } catch (error: any) {

            logger.error({
                service: "order-service",
                requestId: req.headers["x-request-id"],
                message: error.message,
            })

            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async getOrderById(req: Request, res: Response) {
        try {

            let orderId = req.params.id

            let order = await this._orderById.execute(Number(orderId))

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

            logger.error({
                service: "order-service",
                requestId: req.headers["x-request-id"],
                message: error.message,
            })

            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

    async allOrdersOfUser(req: Request, res: Response) {
        try {

            let userId = req.headers["x-user-id"] as string

            if (!userId) {
                throw new Error(USER_NOT_FOUND);
            }

            let orders = await this._allOrdersOfUser.execute(userId)

            res.status(SUCCESS).json({
                success: true,
                message: ORDER_FETCHED_SUCCESSFULLY,
                data: orders
            })

        } catch (error: any) {

            logger.error({
                service: "order-service",
                requestId: req.headers["x-request-id"],
                message: error.message,
            })

            res.status(SERVER_ERROR).json({
                success: false,
                message: error.message
            })
        }
    }

}