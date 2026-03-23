import { ApiResponse } from '@/types/api';
import { IFile } from '@/types/files';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/*
 ************* FILE - API *************
 */
export const fileApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ['Files'],
  endpoints: (builder) => ({
    uploadFile: builder.mutation<ApiResponse<IFile>, FormData>({
      query: (formData) => ({
        url: '/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Files'],
    }),

    getFiles: builder.query<ApiResponse<IFile[]>, void>({
      query: () => '/',
      providesTags: ['Files']
    }),

    getStatus: builder.query<
      ApiResponse<{
        status: string;
        progress: number;
        compressedUrl?: string;
      }>,
      string
    >({
      query: (id) => `/status/${id}`,
    }),

    deleteFile: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Files'],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useGetFilesQuery,
  useGetStatusQuery,
  useDeleteFileMutation,
} = fileApi;