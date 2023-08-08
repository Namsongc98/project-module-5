import { createAsyncThunk } from "@reduxjs/toolkit";

const resetStatus = createAsyncThunk("user/resetStatus", () => {
  return;
});




export {  resetStatus };
