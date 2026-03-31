import { Order } from "../../domain/entities/order.entity";
import { IOrderRepository } from "../../domain/interface/Iorder.repository";


export class OrderById{
    constructor(
        private _orderRepo : IOrderRepository  
    ){}

    async execute(orderId : number) : Promise<Order | null>{

        let order = this._orderRepo.findById(orderId)

        if(!order) return null

        return order

    }
}