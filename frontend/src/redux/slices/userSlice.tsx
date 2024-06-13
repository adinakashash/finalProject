import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import user from "@/classes/user";

const http = 'http://localhost:3000';//process.env.REACT_APP_HTTP;
const businessId = 1; //from auth
// const res = await axios.get(`${http}/user?=${businessId}`);
const { data = {} } = [];

const userSlice = createSlice({
    name: "user",
    initialState: data,
    reducers: {}
})

export const { } = userSlice.actions;
export const selectUser= (state: RootState) => state.userSlice.user
export default userSlice.reducer;

export const createUser = createAsyncThunk('', async (_user: user) => {
    try {
        const response = await axios.post(`${http}/users`, _user)
        return response.data
    } catch (error) {
        return error
    }
});

// export const deleteUser = createAsyncThunk('', async (_id: id) => {
//     try {
//         const response = await axios.delete(http+/workers/${_id})
//         return response.data
//     } catch (error) {
//         return error
//     }
// });

// export const editUser = createAsyncThunk('', async (_user: user) => {
//     try {
//         const response = await axios.put(`${http}+/${_user.userId}, _user`)
//         return response.data
//     } catch (error) {
//         return error
//     }
// });