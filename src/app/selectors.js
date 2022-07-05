import { createSelector } from "@reduxjs/toolkit";
import { sortTaskUp, sortTaskDown } from "../utils/utils";

const selectActiveSort = state => state.tasks.sort
const selectTasks = state => state.tasks.tasks

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