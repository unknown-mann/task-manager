import { createSelector } from "@reduxjs/toolkit";
import { sortTaskUp, sortTaskDown } from "../utils/utils";
import { RootState } from "./store";

const selectActiveSort = (state: RootState) => state.sort.sort
const selectTasks = (state: RootState) => state.tasks.tasks

export const selectFilteredTasks = createSelector(
    [selectActiveSort, selectTasks],
    (activeSort, tasks) => {
        switch (activeSort) {
            case 'up':
                return [...tasks].sort(sortTaskUp)
            case 'down':
                return [...tasks].sort(sortTaskDown)
            default:
                return tasks
        }
    }
)