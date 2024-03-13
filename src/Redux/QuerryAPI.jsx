import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_TOKEN = process.env.VITE_API_TOKEN;

export const querryApi = createApi({
  reducerPath: 'querryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://vps-96abfae6.vps.ovh.net:1337/api/',
    prepareHeaders: (headers) => {
      // Append Authorization header with API token
      if (API_TOKEN) {
        headers.set('Authorization', `Bearer ${API_TOKEN}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getQuerryByName: builder.query({
      query: (name) => `${name}`, // Assuming `name` is a path or query parameter
    }),
  }),
});

export const { useGetQuerryByNameQuery } = querryApi;
