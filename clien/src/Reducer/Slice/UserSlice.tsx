import { createSlice } from "@reduxjs/toolkit";
import {  resetStatus } from "../apiSlice.ts/ApiUser";
import { UsersState } from "../../type/UserModule";

const initialState = {
  userLogin: [],
  error: null,
  loading: false,
} as UsersState;
const UserSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state) {
      state.userLogin = [];
      state.loading = false;
      state.error = null;
    },
    setLogin:((state,action)=>{
      state.userLogin = action.payload;
    })
  },
  extraReducers(builder) {
    builder
      .addCase(resetStatus.fulfilled, (state) => {
        state.error = null;
        state.loading = true;
      })
  },
});

export const { logout,setLogin } = UserSlice.actions
export const getLogin = (state:any) => state.UserSlice.userLogin.dataUser
export default UserSlice.reducer
