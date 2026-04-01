
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import { products } from '../services/products'
import type { RootState } from '../store/store'
import { useNavigate } from 'react-router-dom'
import orderCreate from '../services/order.create'
import Swal from 'sweetalert2'


const ProductPage = () => {

    const user = useSelector((store: RootState) => store.user.user)

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleBuy = async (amount: number) => {
        if (!user) {
            return navigate("/login")
        }

        const result = await Swal.fire({
            title: "Confirm Purchase",
            text: `Are you sure you want to buy for ₹${amount}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, Buy",
            cancelButtonText: "Cancel",
        })

        if (result.isConfirmed) {
            await orderCreate(amount, dispatch)

            Swal.fire({
                icon: "success",
                title: "Order Created 🎉",
                text: "Your order has been placed successfully",
                timer: 1500,
                showConfirmButton: false,
            })
        }
    }

    return (
        <div className="p-10 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Products</h1>

            <div className="grid grid-cols-4 gap-6">
                {products.map((p) => (
                    <ProductCard
                        key={p.id}
                        product={p}
                        onBuy={handleBuy}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductPage