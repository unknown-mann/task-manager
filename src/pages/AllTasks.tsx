import React from 'react';
import { TaskList } from '../components/TaskList';
import { Spinner } from '../components/Spinner';
import { TaskType } from '../types/Types';

type PropsType = {
    tasks: TaskType[],
    isLoading: boolean,
    isError: boolean,
    error: any
}

const AllTasks: React.FC<PropsType> = ({ tasks, isLoading, isError, error }) => {

    if (isLoading) {
        return <Spinner text='Loading...' />
    } else if (isError) {
        if ('status' in error) {
            const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
            return (
                <div>
                    <h1>An error has occurred</h1>
                    <h2>{errMsg}</h2>
                </div>
            )
        } else {
            return <div>{error.message}</div>
        }
    } else {
        return <TaskList tasks={tasks} />
    }
};

export default AllTasks;