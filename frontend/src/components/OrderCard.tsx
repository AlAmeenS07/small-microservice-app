
type Order = {
  id: string
  amount: number
  created_at: string
}

type Props = {
  order: Order
}

function OrderCard({ order }: Props) {
  return (
    <div className="bg-white p-16 rounded-xl shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">Order ID</p>
          <p className="font-semibold">{order.id}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Amount</p>
          <p className="font-bold text-green-600">₹{order.amount}</p>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-2">
        {new Date(order.created_at).toLocaleString()}
      </p>
    </div>
  )
}

export default OrderCard