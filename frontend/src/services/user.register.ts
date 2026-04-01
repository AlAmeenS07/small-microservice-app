import toast from "react-hot-toast";
import type { AppDispatch } from "../store/store";
import { loadingEnd, loadingStart, userSuccess } from "../store/userSlice";
import axiosInstance from "../Helper/axios.instance";


async function userRegister(name : string , email : string , password : string , dispatch : AppDispatch) {

    dispatch(loadingStart())
    try {

        let res = await axiosInstance.post("user-service/auth/api/v1/user/register" , {name , email , password})

        if(res.data.success){
            return true
        }
        
    } catch (error : any) {
        toast.error(error.message)
    }
    finally{
        dispatch(loadingEnd())
    }
}

export default userRegister