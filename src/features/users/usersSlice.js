// import { createSlice } from '@reduxjs/toolkit';
import { createEntityAdapter } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import { apiSlice } from '../api/apiSlice.js';
// const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
// const initialState = {
//     users: [],
//     status: 'idle',
//     error: null,
// };
// const initialState = [];
// const initialState = [
//     { id: '0', name: 'Dude Lebowski' },
//     { id: '1', name: 'Neil Young' },
//     { id: '2', name: 'Dave Gray' },
// ];
const usersAdapter = createEntityAdapter();
const initialState = usersAdapter.getInitialState();
console.log('🚀 ~ file: usersSlice.js:20 ~ initialState:', initialState);

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//     const response = await axios(USERS_URL);
//     return response.data;
// });
// const usersSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {},
//     extraReducers(builder) {
//         builder.addCase(fetchUsers.fulfilled, (state, action) => {
//             return action.payload; //replacing the entire state
//         });
//     },
// });
export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/users',
            transformResponse: (responseData) => {
                return usersAdapter.setAll(initialState, responseData);
            },
            providesTags: (result, error, arg) => [
                { type: 'User', id: 'List' },
                ...result.ids.map((id) => ({ type: 'User', id })),
            ],
        }),
    }),
});
export const { useGetUsersQuery } = usersApiSlice;

// returns the query result object
// export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// Creates memoized selector
// const selectUsersData = createSelector(
//     selectUsersResult,
//     (usersResult) => usersResult.data // normalized state object with ids& entities
// );

// getSelectors creates these selectors and we rename them with aliases using destructuring

// export const {
//     selectAll: selectAllUsers,
//     selectById: selectUserById,
//     selectIds: selectuserIds,
//     // Pass in a selctor that returns the user slice of state
// } = usersAdapter.getSelectors(
//     (state) => selectUsersData(state) ?? initialState
// );
// export const selectAllUsers = (state) => state.users; //state.users defined in store.js
// export const selectUserById = (state, userId) =>
//     state.users.find((user) => user.id === userId);
// export default usersSlice.reducer;
