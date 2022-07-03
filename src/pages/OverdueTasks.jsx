import React from 'react';
import { TaskList } from '../components/TaskList';

const OverdueTasks = ({tasks}) => {
    return <TaskList tasks={tasks} />
};

export default OverdueTasks;