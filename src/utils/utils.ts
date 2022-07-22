import dayjs from "dayjs";
import { TaskType } from "../types/Types";

type RepeatingDays = {
    [key: string]: boolean
};

type SortType = {
    dueDate: string
};

export const isTaskExpired = (dueDate: string) => dueDate && dayjs().isAfter(dueDate, 'D');

export const isTaskExpiringToday = (dueDate: string) => dueDate && dayjs(dueDate).isSame(dayjs(), 'D');

export const formatTaskDueDate = (dueDate: string) => dueDate ? dayjs(dueDate).format('D MMMM') : '';

export const isTaskRepeating = (repeatingDays: RepeatingDays) => Object.values(repeatingDays).some(Boolean);

export const isTaskActiveToday = (repeatingDays: RepeatingDays) => Object.entries(repeatingDays).filter(day => day[1] && (day[0] === dayjs().format('dd').toLowerCase()));

export const taskRepeatingDays = (repeatingDays: RepeatingDays) => Object.entries(repeatingDays).filter(day => day[1])

const getWeightForNullDate = (dateA: string, dateB: string) => {
    if (dateA === null && dateB === null) {
        return 0;
    }

    if (dateA === null) {
        return 1;
    }

    if (dateB === null) {
        return -1;
    }

    return null;
};

const sortTaskUp = (taskA: SortType, taskB: SortType) => {
    const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

    return weight ?? dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
};

const sortTaskDown = (taskA: SortType, taskB: SortType) => {
    const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

    return weight ?? dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate));
};

export const sortTasks = (tasks: TaskType[], sort: string) => {
    if (tasks) {
        switch (sort) {
            case 'up':
                return [...tasks].sort(sortTaskUp)
            case 'down':
                return [...tasks].sort(sortTaskDown)
            default:
                return tasks
        }
    }
};
