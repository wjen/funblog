// single store for application
import { configureStore } from '@reduxjs/toolkit';
// import postsReducer from '../features/posts/postsSlice';
import { apiSlice } from '../features/api/apiSlice';
// import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
    reducer: {
        // posts: postsReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        // users: usersReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), //apislice middleware manages cache lifetimes and expiration, required for rtk query and apislice
});
