import {createSlice } from "@reduxjs/toolkit"


const reviewSlice = createSlice({
    name: "review",
    initialState: {
        reviews: []
    },
    reducers: {
        setAllReview: (state, action) => {
            state.reviews = action.payload;
        }
    }
})

export const {setAllReview} = reviewSlice.actions;
export default reviewSlice.reducer;