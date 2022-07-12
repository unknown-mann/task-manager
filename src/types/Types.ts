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

export type StateType = {
    tasks: TaskType[],
    status?: 'idle' | 'loading' | 'succeeded' | 'rejected',
    error?: string | null,
    sort?: 'default' | 'up' | 'down'
};

export type PropsType = {
    tasks: TaskType[]
};