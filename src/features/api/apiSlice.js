import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
    reducerPath: 'api', //optional
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    tagTypes: ['Post', 'User'],
    endpoints: (builder) => ({}), //default, will need to set up extended slices to separate logic from users and posts
});
