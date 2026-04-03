import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../Helper/axios.instance";


type User = {
    id: string,
    name: string,
    email: string
}

type InitialState = {
    user: User | null
    loading: boolean
}

const initialState: InitialState = {
    user: null,
    loading : false,
}


export const fetchUser = createAsyncThunk("user/fetchUser", async (_, { rejectWithValue }) => {
    try {

    const res = await axiosInstance.get(`user-service/user/api/v1/user/me`, {
        withCredentials: true,
    })

    return res.data.data

    } catch (error : any) {
        return rejectWithValue(error.message)
    }
})


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userSuccess : (state , action) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null
        },
        loadingStart : (state) => {
            state.loading = true
        },
        loadingEnd : (state) => {
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.user = action.payload
                state.loading = false
            })
            .addCase(fetchUser.rejected, (state) => {
                state.loading = false
                state.user = null
            })
    }

})


export const { logout , userSuccess , loadingEnd , loadingStart } = userSlice.actions
export default userSlice.reducer