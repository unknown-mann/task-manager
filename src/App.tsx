import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main'
import SortBar from './components/SortBar';
import AllTasks from './pages/AllTasks';
import OverdueTasks from './pages/OverdueTasks';
import TodayTasks from './pages/TodayTasks';
import FavoriteTasks from './pages/FavoriteTasks';
import RepeatingTasks from './pages/RepeatingTasks';
import ArchiveTasks from './pages/ArchiveTasks';
import { useGetTasksQuery } from './app/tasksApi';
import {
  isTaskExpired,
  isTaskExpiringToday,
  isTaskRepeating,
  isTaskActiveToday,
  sortTasks
} from './utils/utils';

const App = () => {

  const { data: tasks, isLoading, isError, error } = useGetTasksQuery()

  const [sort, setSort] = useState('')

  const sortedTasks = sortTasks(tasks!, sort)

  const allTasks = sortedTasks?.filter(task => task && !task.isArchived)
  const favoriteTasks = sortedTasks?.filter(task => task.isFavorite && !task.isArchived)
  const repeatingTasks = sortedTasks?.filter(task => isTaskRepeating(task.repeatingDays) && !task.isArchived)
  const archivedTasks = sortedTasks?.filter(task => task.isArchived)
  const expiredTasks = sortedTasks?.filter(task => isTaskExpired(task.dueDate) && !task.isArchived)
  const todayTasks = sortedTasks?.filter(task => (isTaskExpiringToday(task.dueDate) || isTaskActiveToday(task.repeatingDays).length) && !task.isArchived)

  return (
    <>
      <Header
        allTasksNum={allTasks?.length}
        expiredTasksNum={expiredTasks?.length}
        todayTasksNum={todayTasks?.length}
        favoriteTasksNum={favoriteTasks?.length}
        repeatingTasksNum={repeatingTasks?.length}
        archivedTasksNum={archivedTasks?.length}
      />
      <Main>
        <SortBar sort={sort} setSort={setSort} />
        <Routes>
          <Route path='/' element={<AllTasks tasks={allTasks!} isLoading={isLoading} isError={isError} error={error} />}></Route>
          <Route path='/overdue' element={<OverdueTasks tasks={expiredTasks!} />}></Route>
          <Route path='/today' element={<TodayTasks tasks={todayTasks!} />}></Route>
          <Route path='/favorites' element={<FavoriteTasks tasks={favoriteTasks!} />}></Route>
          <Route path='/repeating' element={<RepeatingTasks tasks={repeatingTasks!} />}></Route>
          <Route path='/archive' element={<ArchiveTasks tasks={archivedTasks!} />}></Route>
        </Routes>
      </Main>
    </>
  );
}

export default App;
