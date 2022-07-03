import dayjs from "dayjs";

export const isTaskExpired = (dueDate) => dueDate && dayjs().isAfter(dueDate, 'D');

export const isTaskExpiringToday = (dueDate) => dueDate && dayjs(dueDate).isSame(dayjs(), 'D');

export const formatTaskDueDate = (dueDate) => dueDate ? dayjs(dueDate).format('D MMMM') : '';

export const isTaskRepeating = (repeating) => Object.values(repeating).some(Boolean);

export const isTaskActiveToday = (repeatingDays) => Object.entries(repeatingDays).filter(day => day[1] && (day[0] === dayjs().format('dd').toLowerCase()));

export const taskRepeatingDays = (repeatingDays) => Object.entries(repeatingDays).filter(day => day[1])

const getWeightForNullDate = (dateA, dateB) => {
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

export const sortTaskUp = (taskA, taskB) => {
    const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);
    
    return weight ?? dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
};

export const sortTaskDown = (taskA, taskB) => {
    const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);

    return weight ?? dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate));
};
