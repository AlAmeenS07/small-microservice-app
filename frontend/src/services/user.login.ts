import { loadingEnd, loadingStart, userSuccess } from "../store/userSlice";
import toast from "react-hot-toast";
import axiosInstance from "../Helper/axios.instance";
import type { AppDispatch } from "../store/store";



async function userLogin(email : string , password : string , dispatch : AppDispatch) {

    dispatch(loadingStart())
    try {

        let res = await axiosInstance.post("user-service/auth/api/v1/user/login" , {email , password})

        if(res.data.success){
            dispatch(userSuccess(res.data.data))
            toast.success(res.data.message)
            return true
        }

        toast.error("Something error !")
        
    } catch (error : any) {
        console.log("error" , error)
        toast.error(error?.message)
    }
    finally{
        dispatch(loadingEnd())
    }
}

export default userLogin