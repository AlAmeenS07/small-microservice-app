import toast from "react-hot-toast";
import axiosInstance from "../Helper/axios.instance";
import type { AppDispatch } from "../store/store";
import { logout } from "../store/userSlice";


async function userLogout(dispatch : AppDispatch) {
    try {

        let res = await axiosInstance.post("user-service/user/api/v1/user/logout")

        if(res.data.success){
            dispatch(logout())
        }
        
    } catch (error : any) {
        toast.error(error.response.data.message)
    }
}

export default userLogout