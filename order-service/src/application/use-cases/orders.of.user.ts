import { Order } from "../../domain/entities/order.entity";
import { IOrderRepository } from "../../domain/interface/Iorder.repository";

export interface IAllOrdersOfUsers{
    execute(userId : string) : Promise<Order[]>
}

export class AllOrdersOfUser{
    constructor(
        private _orderRepo : IOrderRepository
    ){}

    async execute(userId : string) : Promise<Order[]>{

        let orders = await this._orderRepo.findOrdersByUserId(userId)

        return orders
    }
}