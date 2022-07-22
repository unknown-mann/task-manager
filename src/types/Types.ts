export type TaskType = {
    id: string,
    color: string,
    description: string,
    dueDate: string,
    isArchived?: boolean,
    isFavorite?: boolean,
    repeatingDays: {
        [key: string]: boolean
    }
};

export type PropsType = {
    tasks: TaskType[]
};