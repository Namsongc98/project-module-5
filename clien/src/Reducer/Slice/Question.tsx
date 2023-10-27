import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataQuestion: [],
    dataQuestionBeginer: [],
}
const SliceQuestion = createSlice({
    name: "question",
    initialState,
    reducers: {
        setDataQuestion: ((state, action) => {
            state.dataQuestion = action.payload
        })

    }
})
export const { setDataQuestion } = SliceQuestion.actions
export const getDataQuestion = (state: any) => state.Question.dataQuestion
export default SliceQuestion.reducer