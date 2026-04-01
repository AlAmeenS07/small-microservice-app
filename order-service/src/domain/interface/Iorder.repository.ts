import { Order } from "../entities/order.entity";


export interface IOrderRepository{
    create(userId : string, name : string , email : string, amount : number ): Promise<Order>
    findById(id : number) : Promise<Order | null>
    findOrdersByUserId(userId : string) : Promise<Order[]>
}