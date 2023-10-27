import { createSlice } from "@reduxjs/toolkit";

import { ITopicState } from "../../type/UserModule";


const initialState = {
  useTopic: [],
  useTopicBeginner: [],
  useTopicIntermediate: [],
  useTopicAdvanced: [],
  error: null,
  loading: false,
} as ITopicState
const useSliceTopic = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setAllTopic: ((state, action) => {
      state.useTopic = action.payload
    }),
  },

})

export const {  setAllTopic,  } = useSliceTopic.actions
export const getTopicBeginner = (state: any) => state.Topic.useTopicBeginner
export const getTopicIntermediate = (state: any) => state.Topic.useTopicIntermediate
export const getTopicAdvanced = (state: any) => state.Topic.useTopicAdvanced
export const getAllTopic = (state: any) => state.Topic.useTopic
export default useSliceTopic.reducer