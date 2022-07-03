import React from 'react';
import { TaskList } from '../components/TaskList';

const FavoriteTasks = ({tasks}) => {
    return <TaskList tasks={tasks} />
};

export default FavoriteTasks;