import React from 'react';
import { TaskList } from '../components/TaskList';

const TodayTasks = ({ tasks }) => {
    return <TaskList tasks={tasks} />
};

export default TodayTasks;