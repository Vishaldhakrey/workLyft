import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        loading: false,
        adminJobs: [],
        searchJobByText: "",
        allAppliedJobs: [],
        searchJobQuery:""
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAdminJobs: (state, action) => {
            state.adminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchJobQuery:(state, action) => {
            state.searchJobQuery = action.payload;
        }
    },
});

export const {
    setAllJobs,
    setSingleJob,
    setAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchJobQuery
} = jobSlice.actions;
export default jobSlice.reducer;
