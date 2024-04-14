import baseApi from "../api/baseApi";

const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: ["Tasks"],
    }),
    getSingleTask: builder.query({
      query: (id) => `/task/${id}`,
    }),
    getArchive : builder.query({
      query : ()=> "/tasks/archive",
      providesTags: ["Tasks"],
    }),
    updateStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body: status,
      }),
      invalidatesTags: ["Tasks"],
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: "/tasks",
        method: "POST",
        body: task,
      }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {useGetTasksQuery ,useGetSingleTaskQuery , useUpdateStatusMutation, useAddTaskMutation, useDeleteTaskMutation,useGetArchiveQuery} = tasksApi