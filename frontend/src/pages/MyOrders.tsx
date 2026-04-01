import { useEffect, useState } from "react"
import OrderCard from "../components/OrderCard"
import fetchOrders from "../services/fetch.orders"

export type Order = {
  id: string
  amount: number
  created_at: string
}

function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders(setOrders , setLoading)
  }, [])

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>
  }

  if (orders.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No orders found 
      </p>
    )
  }

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}

export default MyOrders