import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { TaskType } from "../types/Types"

export const tasksApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://server-for--task-manager.herokuapp.com/' }),
    tagTypes: ['Task'],
    endpoints: builder => ({
        getTasks: builder.query<TaskType[], void>({
            query: () => 'tasks',
            providesTags: ['Task']
        }),
        addTask: builder.mutation<TaskType[], TaskType>({
            query: task => ({
                url: `/tasks`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: task
            }),
            invalidatesTags: ['Task']
        }),
        deleteTask: builder.mutation<TaskType[], string>({
            query: id => ({
                url: `tasks/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }),
            invalidatesTags: ['Task']
        }),
        editTask: builder.mutation<TaskType[], TaskType>({
            query: ({ id, color, description, dueDate, repeatingDays }) => ({
                url: `tasks/${id}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    id,
                    color,
                    description,
                    dueDate,
                    repeatingDays
                }
            }),
            invalidatesTags: ['Task']
        }),
        toggleArchive: builder.mutation<TaskType[], { id: string, isArchived: boolean }>({
            query: ({ id, isArchived }) => ({
                url: `tasks/${id}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    isArchived: !isArchived
                }
            }),
            invalidatesTags: ['Task']
        }),
        toggleFavorite: builder.mutation<TaskType[], { id: string, isFavorite: boolean }>({
            query: ({ id, isFavorite }) => ({
                url: `tasks/${id}`,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                    isFavorite: !isFavorite
                }
            }),
            invalidatesTags: ['Task']
        })
    })
})

export const {
    useGetTasksQuery,
    useAddTaskMutation,
    useDeleteTaskMutation,
    useEditTaskMutation,
    useToggleArchiveMutation,
    useToggleFavoriteMutation
} = tasksApi;