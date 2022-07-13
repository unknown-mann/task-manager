import { createSlice, createAsyncThunk, AnyAction, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { TaskType, StateType } from "../../types/Types";

const BASE_URL = 'https://server-for--task-manager.herokuapp.com/tasks/';

export const fetchTasks = createAsyncThunk<TaskType[], undefined, { rejectValue: string }>
    ('tasks/fetchTasks', async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(BASE_URL)
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    })

export const addNewTask = createAsyncThunk<TaskType, TaskType, { rejectValue: string }>(
    'tasks/addNewTask',
    async (task, { rejectWithValue }) => {
        try {
            const respone = await axios.post(BASE_URL, {
                "id": task.id,
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
            return respone.data as TaskType
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    })

export const deleteTask = createAsyncThunk<string, string, { rejectValue: string }>(
    'tasks/deleteTask',
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(BASE_URL + id)
            return id
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleArchive = createAsyncThunk<string, string, { rejectValue: string, state: { tasks: StateType } }>(
    'tasks/addToArchive',
    async (id, { rejectWithValue, getState }) => {
        try {
            const task = getState().tasks.tasks.find(task => task.id === id)
            await axios.patch(BASE_URL + id, {
                isArchived: !task?.isArchived
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return id
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const toggleFavorite = createAsyncThunk<string, string, { rejectValue: string, state: { tasks: StateType } }>(
    'tasks/addToFavorite',
    async (id, { rejectWithValue, getState }) => {
        try {
            const task = getState().tasks.tasks.find(task => task.id === id)
            await axios.patch(BASE_URL + id, {
                isFavorite: !task?.isFavorite
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return id
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
);

export const updateTask = createAsyncThunk<TaskType, TaskType, { rejectValue: string }>(
    'tasks/editTask',
    async (task, { rejectWithValue }) => {
        try {
            await axios.patch(BASE_URL + task.id, {
                color: task.color,
                description: task.description,
                dueDate: task.dueDate,
                repeatingDays: task.repeatingDays
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            return task as TaskType
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState: StateType = {
    tasks: [],
    status: 'idle',
    error: null
}

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.tasks = action.payload
                state.status = 'succeeded'
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.tasks.push(action.payload)
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.tasks = state.tasks.filter(task => task.id !== action.payload)
            })
            .addCase(toggleArchive.fulfilled, (state, action) => {
                const archivedTask = state.tasks.find(task => task.id === action.payload)
                if (archivedTask) {
                    archivedTask.isArchived = !archivedTask.isArchived
                }
            })
            .addCase(toggleFavorite.fulfilled, (state, action) => {
                const favoriteTask = state.tasks.find(task => task.id === action.payload)
                if (favoriteTask) {
                    favoriteTask.isFavorite = !favoriteTask.isFavorite
                }
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const { id, color, description, dueDate, repeatingDays } = action.payload
                const oldTask = state.tasks.find(task => task.id === id)
                if (oldTask) {
                    oldTask.color = color
                    oldTask.description = description
                    oldTask.dueDate = dueDate
                    oldTask.repeatingDays = repeatingDays
                }
            })
            .addMatcher(isEror, (state, action: PayloadAction<string>) => {
                state.error = action.payload
                state.status = 'rejected'
            })
    }
})

const isEror = (action: AnyAction) => {
    return action.type.endsWith('rejected')
}

export default tasksSlice.reducer
