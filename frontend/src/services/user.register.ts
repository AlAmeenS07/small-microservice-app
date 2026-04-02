import toast from "react-hot-toast";
import type { AppDispatch } from "../store/store";
import { loadingEnd, loadingStart } from "../store/userSlice";
import axiosInstance from "../Helper/axios.instance";
import type React from "react";


async function userRegister(name: string, email: string, password: string, setError: React.Dispatch<React.SetStateAction<string>>, dispatch: AppDispatch) {

    dispatch(loadingStart())
    try {

        if (name.trim() == "" || email.trim() == "" || password.trim() == "") {
            return setError("input field must be filled !")
        }

        if (!email.includes("@")) {
            return setError("enter valid email !")
        }

        if (name.length < 3) {
            return setError("name should be atleast 3 letters !")
        }

        if (password.length < 6) {
            return setError("password should be atleast 6 letters !")
        }

        setError("")

        let res = await axiosInstance.post("user-service/auth/api/v1/user/register", { name, email, password })

        if (res.data.success) {
            return true
        }

    } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something wrong !")
    }
    finally {
        dispatch(loadingEnd())
    }
}

export default userRegister