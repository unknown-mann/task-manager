import React from 'react';
import { TaskList } from '../components/TaskList';
import { PropsType } from '../types/Types';

const ArchiveTasks: React.FC<PropsType> = ({ tasks }) => {
    return <TaskList tasks={tasks} />
};

export default ArchiveTasks;