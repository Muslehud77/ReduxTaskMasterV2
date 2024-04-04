import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000"}),
  endpoints : (builder)=>({
    getTasks : builder.query({
        query : ()=> '/tasks'
    }),
    updateStatus : builder.mutation({
      query : ({id,status}) => ({
        url : `/tasks/${id}`,
        method : "PATCH",
        body : status,
        
      })
    }),
    addTask : builder.mutation({
      query : (task)=>({
        url : '/tasks',
        method : "POST",
        body: task
      })
    }),
    deleteTask : builder.mutation({
      query : (id)=>({
        url : `/tasks/${id}`,
        method : "DELETE",
      })
    })
    
  }),

});

export const {useGetTasksQuery , useUpdateStatusMutation, useAddTaskMutation, useDeleteTaskMutation} = baseApi

export default baseApi