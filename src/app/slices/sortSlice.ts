import { createSlice } from "@reduxjs/toolkit";
import { SortType } from "../../types/Types";


const initialState: SortType = {
    sort: 'default'
};

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        switchSortBy(state, action) {
            state.sort = action.payload
        }
    }
});

export const { switchSortBy } = sortSlice.actions
export default sortSlice.reducer