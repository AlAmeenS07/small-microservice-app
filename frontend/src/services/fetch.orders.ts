import toast from "react-hot-toast"
import axiosInstance from "../Helper/axios.instance"
import type React from "react"
import type { Order } from "../pages/MyOrders"

async function fetchOrders(setOrders : React.Dispatch<React.SetStateAction<Order[]>>  , setLoading : React.Dispatch<React.SetStateAction<boolean>> ) {

    setLoading(true)
    try {
        const res = await axiosInstance.get("order-service/api/v1/order")

        console.log(res.data)

        if(res.data.success){
            setOrders(res.data.data)
            return true
        }

    } catch (error: any) {
        toast.error(error.response?.data?.message || "Failed to fetch orders")
    }
    finally{
        setLoading(false)
    }
}

export default fetchOrders