// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_TOKEN = import.meta.env.VITE_API_TOKEN;
console.log('API_TOKEN:', API_TOKEN);
// Define a service using a base URL and expected endpoints
export const querryApi = createApi({
  reducerPath: 'querryApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://vps-96abfae6.vps.ovh.net:1337/api/', headers: {Authorization: `Bearer ${API_TOKEN}`} }),
  endpoints: (builder) => ({
    getQuerryByName: builder.query({
      query: (name) => `${name}`,
    }),
  }),
})
console.log('API configuration:', querryApi);

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetQuerryByNameQuery } = querryApi

