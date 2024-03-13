// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
// Define a service using a base URL and expected endpoints
export const querryApi = createApi({
  reducerPath: 'querryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:1337/api/', headers: {Authorization: `Bearer ${API_TOKEN}`} }),
  endpoints: (builder) => ({
    getQuerryByName: builder.query({
      query: (name) => `${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetQuerryByNameQuery } = querryApi