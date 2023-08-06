import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosPublic} from "../../config/ConfigApi";

const resetStatus = createAsyncThunk("user/resetStatus", () => {
  return;
});




export {  resetStatus };
