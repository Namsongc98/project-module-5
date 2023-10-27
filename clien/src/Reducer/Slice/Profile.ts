import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    dataProfile: {}
}
const SliceProfile = createSlice({
    name: "Profile",
    initialState,
    reducers: {
        setProfile: ((state, action) => {
            state.dataProfile = action.payload
        }),
       
    }
})

export const { setProfile } = SliceProfile.actions
export const getProfile = (state: any) => state.Profile.dataProfile.dataProfile
export default SliceProfile.reducer
