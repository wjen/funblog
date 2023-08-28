import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
// const initialState = {
//     users: [],
//     status: 'idle',
//     error: null,
// };
const initialState = [];
// const initialState = [
//     { id: '0', name: 'Dude Lebowski' },
//     { id: '1', name: 'Neil Young' },
//     { id: '2', name: 'Dave Gray' },
// ];
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios(USERS_URL);
    return response.data;
});
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload; //replacing the entire state
        });
    },
});

export const selectAllUsers = (state) => state.users; //state.users defined in store.js
export default usersSlice.reducer;
