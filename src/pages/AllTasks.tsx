import React from 'react';
import { TaskList } from '../components/TaskList';
import { Spinner } from '../components/Spinner';
import { StateType } from '../types/Types';

const AllTasks: React.FC<StateType> = ({ tasks, status, error }) => {

    let content

    if (status === 'loading') {
        content = <Spinner text='Loading...' />
    } else if (status === 'rejected') {
        content = <h1>Error: {error}</h1>
    } else if (status === 'succeeded') {
        content = <TaskList tasks={tasks} />
    }

    return (
        <>
            {content}
        </>
    )
};

export default AllTasks;