import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosPublic} from "../../config/ConfigApi";

const getEvaluete = createAsyncThunk("evaluate/getEvaluate", async () => {
    try {
        const response = await axiosPublic.get("evaluate/getevaluate")
        return response.data
    } catch (error) {
        throw new Error(error)
    }
})


export { getEvaluete }