import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*
 ************* FILE - API *************
 */
export const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  endpoints: (builder) => ({
    uploadFile: builder.mutation({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
    }),

    getFiles: builder.query({
      query: () => '/',
    }),

    getStatus: builder.query({
      query: (id) => `/status/${id}`,
    }),

    deleteFile: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetFilesQuery,
  useGetStatusQuery,
  useDeleteFileMutation,
} = fileApi;