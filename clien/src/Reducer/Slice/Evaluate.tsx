import { createSlice } from "@reduxjs/toolkit";
import { IUseEvaluate } from "../../type/UserModule";
import { getEvaluete } from "../apiSlice.ts/Evaluate";


const initialState = {
    userEvaluate: [],
    error: null,
    loading: false,
} as IUseEvaluate
const Evaluate = createSlice({
    name: "evaluate",
    initialState,
    reducers: {
        setEvaluateApi: ((state, action) => {
            state.userEvaluate = action.payload
        })
    },
    extraReducers(builder) {
        builder
            .addCase(getEvaluete.fulfilled, (state, action) => {
                state.error = null;
                state.userEvaluate = action.payload;
                state.loading = false;
            })
            .addCase(getEvaluete.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            })
            .addCase(getEvaluete.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
           
          
    }
})

export const  {setEvaluateApi}= Evaluate.actions
export default Evaluate.reducer