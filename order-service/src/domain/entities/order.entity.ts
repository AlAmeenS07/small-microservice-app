

export enum OrderStatus {
    PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    COMPLETED = "COMPLETED"
}

export class Order {
    constructor(
        public userId: string,
        public amount: number,
        public status: OrderStatus,
        public created_at: Date,
        public updated_at: Date,
        public id?: number
    ) { }
}