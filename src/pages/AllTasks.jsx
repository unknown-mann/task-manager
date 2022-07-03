import React from 'react';
import { TaskList } from '../components/TaskList';
import { Spinner } from '../components/Spinner';

const AllTasks = ({ tasks, status, error }) => {

    if (status === 'loading') {
        return <Spinner text='Loading...' />
    } else if (status === 'rejected') {
        return <h1>Error: {error}</h1>
    } else if (status === 'succeeded') {
        return <TaskList tasks={tasks} />
    }
};

export default AllTasks;