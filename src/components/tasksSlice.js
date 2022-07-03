import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { nanoid } from "nanoid";

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get('https://server-for--task-manager.herokuapp.com/tasks')
        return response.data
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

export const addNewTask = createAsyncThunk(
    'tasks/addNewTask',
    async (task, { rejectWithValue }) => {
        try {
            const respone = await axios.post('https://server-for--task-manager.herokuapp.com/tasks', {
                "id": nanoid(),
                "color": task.color,
                "description": task.description,
                "dueDate": task.dueDate,
                "isArchived": false,
                "isFavorite": false,
                "repeatingDays": task.repeatingDays
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return respone.data
        } catch (error) {
            return rejectWithValue(error.message)
        }
})

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (id, {rejectWithValue}) => {
        try {
            await axios.delete(`https://server-for--task-manager.herokuapp.com/tasks/${id}`)
            return id
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleArchive = createAsyncThunk(
    'tasks/addToArchive',
    async (id, {rejectWithValue, getState}) => {
        try {
            const task = getState().tasks.tasks.find(task => task.id === id)
            await axios.patch(`https://server-for--task-manager.herokuapp.com/tasks/${id}`, {
                isArchived: !task.isArchived
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return id
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleFavorite = createAsyncThunk(
    'tasks/addToFavorite',
    async (id, {rejectWithValue, getState}) => {
        try {
            const task = getState().tasks.tasks.find(task => task.id === id)
            await axios.patch(`https://server-for--task-manager.herokuapp.com/tasks/${id}`, {
                isFavorite: !task.isFavorite
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return id
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const editTask = createAsyncThunk(
    'tasks/editTask',
    async (task, {rejectWithValue}) => {
        try {
            await axios.patch(`https://server-for--task-manager.herokuapp.com/tasks/${task.id}`, {
                color: task.color,
                description: task.description,
                dueDate: task.dueDate,
                repeatingDays: task.repeatingDays
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return task
        } catch(error) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    tasks: [],
    status: 'idle',
    error: '',
    sort: 'default'
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        switchSortType(state, action) {
            state.sort = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload
                state.status = 'succeeded'
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.error = action.payload
                state.status = 'rejected'
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload)
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload)
            })
            .addCase(toggleArchive.fulfilled, (state, action) => {
                const archivedTask = state.tasks.find(task => task.id === action.payload)
                archivedTask.isArchived = !archivedTask.isArchived
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                const favoriteTask = state.tasks.find(task => task.id === action.payload)
                favoriteTask.isFavorite = !favoriteTask.isFavorite
            })
            .addCase(editTask.fulfilled, (state, action) => {
                const newTask = action.payload
                console.log('new task: ', newTask)
                const oldTask = state.tasks.find(task => task.id === newTask.id)
                oldTask.color = newTask.color
                oldTask.description = newTask.description
                oldTask.dueDate = newTask.dueDate
                oldTask.repeatingDays = newTask.repeatingDays
            })
    }
})

export const { switchSortType } = tasksSlice.actions

export default tasksSlice.reducer
