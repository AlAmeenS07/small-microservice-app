import { Order } from "../../domain/entities/order.entity";
import { IOrderRepository } from "../../domain/interface/Iorder.repository";
import { UserDataService } from "../../infrastructure/services/user.service";


export class OrderCreate{
    constructor(
        private _orderRepo : IOrderRepository,
        private _extUserService : UserDataService
    ){}

    async execute(userId : string, amount : number) : Promise<Order> {

        let user = await this._extUserService.getUserById(userId)
        
        let order = await this._orderRepo.create(userId, user?.name as string, user?.email as string, amount)

        return order
    }
}