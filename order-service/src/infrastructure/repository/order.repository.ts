import { prisma } from "../../config/prisma";
import { Order, OrderStatus } from "../../domain/entities/order.entity";
import { IOrderRepository } from "../../domain/interface/Iorder.repository";

export class OrderRepository implements IOrderRepository{
    async create(userId: string, name : string, email : string, amount: number): Promise<Order> {

        let order = await prisma.order.create({
            data : {
                userId,
                name,
                email,
                amount,
            }
        })

        return new Order(order.userId , order.amount , order.status as OrderStatus, order.createdAt , order.updatedAt , order.id)
    }

    async findById(id: number): Promise<Order | null> {

        let order = await prisma.order.findUnique({
            where : { id }
        })

        if(!order) return null

        return new Order(order.userId , order.amount , order.status as OrderStatus, order.createdAt , order.updatedAt , order.id)
    }   

    async findOrdersByUserId(userId: string): Promise<Order[]> {
        
        let orders = await prisma.order.findMany({
            where : { userId }
        })

        let allOrders = orders.map(o => {
            return new Order(o.userId , o.amount , o.status as OrderStatus , o.createdAt , o.updatedAt , o.id )
        })

        return allOrders
    }
}