import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchTasks } from './components/tasksSlice';
import Header from './components/Header';
import { Main } from './components/Main';
import SortBar from './components/SortBar';
import AllTasks from './pages/AllTasks';
import OverdueTasks from './pages/OverdueTasks';
import TodayTasks from './pages/TodayTasks';
import FavoriteTasks from './pages/FavoriteTasks';
import RepeatingTasks from './pages/RepeatingTasks';
import ArchiveTasks from './pages/ArchiveTasks';
import { isTaskExpired, isTaskExpiringToday, isTaskRepeating, isTaskActiveToday } from './utils/utils';
import { selectFilteredTasks } from './components/selectors';
import { Modal } from './components/Modal';

const App = () => {

  const dispatch = useDispatch()

  const { status, error } = useSelector(state => state.tasks)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks())
    }
  }, [dispatch, status])

  const tasks = useSelector(selectFilteredTasks)

  const allTasks = tasks.filter(task => task && !task.isArchived)
  const favoriteTasks = tasks.filter(task => task.isFavorite && !task.isArchived)
  const repeatingTasks = tasks.filter(task => isTaskRepeating(task.repeatingDays) && !task.isArchived)
  const archivedTasks = tasks.filter(task => task.isArchived)
  const expiredTasks = tasks.filter(task => isTaskExpired(task.dueDate) && !task.isArchived)
  const todayTasks = tasks.filter(task => (isTaskExpiringToday(task.dueDate) || isTaskActiveToday(task.repeatingDays).length) && !task.isArchived)

  const [active, setActive] = useState(false)

  return (
    <>
      <Header
        allTasksNum={allTasks.length}
        expiredTasksNum={expiredTasks.length}
        todayTasksNum={todayTasks.length}
        favoriteTasksNum={favoriteTasks.length}
        repeatingTasksNum={repeatingTasks.length}
        archivedTasksNum={archivedTasks.length}
        setActive={setActive} 
        />
      <Main>
      <Modal active={active} setActive={setActive}/>
        <SortBar/>
        <Routes>
          <Route path='/' element={<AllTasks tasks={allTasks} status={status} error={error} />}></Route>
          <Route path='/overdue' element={<OverdueTasks tasks={expiredTasks}/>}></Route>
          <Route path='/today' element={<TodayTasks tasks={todayTasks}/>}></Route>
          <Route path='/favorites' element={<FavoriteTasks tasks={favoriteTasks} />}></Route>
          <Route path='/repeating' element={<RepeatingTasks tasks={repeatingTasks} />}></Route>
          <Route path='/archive' element={<ArchiveTasks tasks={archivedTasks} />}></Route>
        </Routes>
      </Main>
    </>
  );
}

export default App;
