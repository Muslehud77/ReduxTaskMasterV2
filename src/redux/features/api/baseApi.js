import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000"}),
  endpoints : (builder)=>({
    getTasks : builder.query({
        query : ()=> '/tasks'
    }),
    updateStatus : builder.mutation({
      query : ({id,task}) => ({
        url : `/tasks/${id}`,
        method : "PATCH",
        body : task,
        
      })
    })
  }),

});

export const {useGetTasksQuery , useUpdateStatusMutation} = baseApi

export default baseApi