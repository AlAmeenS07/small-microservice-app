import toast from "react-hot-toast";
import type { AppDispatch } from "../store/store";
import { loadingEnd, loadingStart } from "../store/userSlice";
import axiosInstance from "../Helper/axios.instance";


async function orderCreate(amount : number , dispatch : AppDispatch) {

    dispatch(loadingStart())
    try {

        let res = await axiosInstance.post("order-service/api/v1/order" , { amount })

        console.log(res.data)

        if(res.data.success){
            toast.success("Order created successfully")
            return true
        }

        toast.error("something error !")

        
    } catch (error : any) {
        console.log(error)
        toast.error(error?.response?.data?.message || "Something wrong !")
    }
    finally{
        dispatch(loadingEnd())
    }
}

export default orderCreate