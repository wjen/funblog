import {
    // createSlice,
    // createAsyncThunk,
    // createSelector,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import sub from 'date-fns/sub';
import { apiSlice } from '../api/apiSlice';
// import axios from 'axios';
// normalized state:  {posts: {ids: [1,2,3], entities: {'1': {userId: 1, id: 1, title: 'etc'}}}}
// const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
});

// const initialState = [
//     {
//         id: '1',
//         title: 'Learning Redux Toolkit',
//         content: "I've heard good things.",
//         date: sub(new Date(), { minutes: 10 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0,
//         },
//     },
//     {
//         id: '2',
//         title: 'Slices...',
//         content: 'The more I say slice, the more I want pizza.',
//         date: sub(new Date(), { minutes: 5 }).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0,
//         },
//     },
// ];
// const initialState = {
//     posts: [],
//     status: 'idle', //'idle' | 'loading' | 'succeeded' | 'faled'
//     error: null,
//     count: 0,
// };
const initialState = postsAdapter.getInitialState();
console.log('🚀 ~ file: postsSlice.js:52 ~ initialState:', initialState);
// const initialState = postsAdapter.getInitialState({
//     status: 'idle',
//     error: null,
//     count: 0,
// });

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//     const response = await axios.get(POSTS_URL);
//     return response.data;
// });

// export const addNewPost = createAsyncThunk(
//     'posts/addNewPost',
//     async (initialPost) => {
//         const response = await axios.post(POSTS_URL, initialPost);
//         return response.data;
//     }
// );

// export const updatePost = createAsyncThunk(
//     'posts/updatePost',
//     async (initialPost) => {
//         const { id } = initialPost;
//         try {
//             const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
//             return response.data;
//         } catch (err) {
//             return err.message;
//             return initialPost; //only for testing redux
//         }
//     }
// );

// export const deletePost = createAsyncThunk(
//     'posts/deletePost',
//     async (initialPost) => {
//         const { id } = initialPost;
//         try {
//             const response = await axios.delete(`${POSTS_URL}/${id}`);
//             if (response?.status === 200) return initialPost;
//             return `${response?.status}: ${response?.statusText}`;
//         } catch (error) {
//             return error.message;
//         }
//     }
// );

// const postsSlice = createSlice({
//     name: 'posts',
//     initialState,
//     reducers: {
//         // postsAdded(state, action) {
//         //     state.posts.push(action.payload); //Immer js working inside createslice, allows you to mutate state
//         // },
//         // postsAdded: {
//         //     reducer(state, action) {
//         //         state.posts.push(action.payload); //Immer js working inside createslice, allows you to mutate state
//         //     },
//         //     prepare(title, content, userId) {
//         //         return {
//         //             payload: {
//         //                 id: nanoid(),
//         //                 title,
//         //                 content,
//         //                 date: new Date().toISOString(),
//         //                 userId,
//         //                 reactions: {
//         //                     thumbsUp: 0,
//         //                     wow: 0,
//         //                     heart: 0,
//         //                     rocket: 0,
//         //                     coffee: 0,
//         //                 },
//         //             },
//         //         };
//         //     },
//         // },
//         reactionAdded(state, action) {
//             const { postId, reaction } = action.payload;
//             // const existingPost = state.posts.find((post) => post.id === postId);
//             const existingPost = state.entities[postId];
//             if (existingPost) {
//                 existingPost.reactions[reaction]++;
//             }
//         },
//         increaseCount(state, action) {
//             state.count = state.count + 1;
//         },
//     },
//     extraReducers(builder) {
//         builder
//             .addCase(fetchPosts.pending, (state, action) => {
//                 state.status = 'loading';
//             })
//             .addCase(fetchPosts.fulfilled, (state, action) => {
//                 state.status = 'succeeded';
//                 // Adding date and reactions
//                 let min = 1;
//                 const loadedPosts = action.payload.map((post) => {
//                     post.date = sub(new Date(), {
//                         minutes: min++,
//                     }).toISOString();
//                     post.reactions = {
//                         thumbsUp: 0,
//                         wow: 0,
//                         heart: 0,
//                         rocket: 0,
//                         coffee: 0,
//                     };
//                     return post;
//                 });
//                 // Add any fetched posts to the array
//                 // state.posts = state.posts.concat(loadedPosts);
//                 postsAdapter.upsertMany(state, loadedPosts);
//             })
//             .addCase(fetchPosts.rejected, (state, action) => {
//                 state.status = 'failed';
//                 state.error = action.error.message;
//             })
//             .addCase(addNewPost.fulfilled, (state, action) => {
//                 // Fix for API post IDs:
//                 // Creating sortedPosts & assigning the id
//                 // would be not be needed if the fake API
//                 // returned accurate new post IDs
//                 const sortedPosts = state.posts.sort((a, b) => {
//                     if (a.id > b.id) return 1;
//                     if (a.id < b.id) return -1;
//                     return 0;
//                 });
//                 action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
//                 // End fix for fake API post IDs

//                 action.payload.userId = Number(action.payload.userId);
//                 action.payload.date = new Date().toISOString();
//                 action.payload.reactions = {
//                     thumbsUp: 0,
//                     hooray: 0,
//                     heart: 0,
//                     rocket: 0,
//                     eyes: 0,
//                 };
//                 console.log(action.payload);
//                 // state.posts.push(action.payload);
//                 postsAdapter.addOne(state, action.payload);
//             })
//             .addCase(updatePost.fulfilled, (state, action) => {
//                 if (!action.payload?.id) {
//                     console.log('Update could not complete');
//                     console.log(action.payload);
//                     return;
//                 }
//                 // const { id } = action.payload;
//                 action.payload.date = new Date().toISOString();
//                 // const posts = state.posts.filter((post) => post.id !== id);
//                 // state.posts = [...posts, action.payload];
//                 postsAdapter.upsertOne(state, action.payload);
//             })
//             .addCase(deletePost.fulfilled, (state, action) => {
//                 if (!action.payload?.id) {
//                     console.log('Delete could not be completed');
//                     console.log(action.payload);
//                     return;
//                 }
//                 const { id } = action.payload;
//                 // const posts = state.posts.filter((post) => post.id !== id);
//                 // state.posts = posts;
//                 postsAdapter.removeOne(state, id);
//             });
//     },
// });

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/posts',
            transformResponse: (responseData) => {
                let min = 1;
                const loadedPosts = responseData.map((post) => {
                    if (!post?.date)
                        post.date = sub(new Date(), {
                            minutes: min++,
                        }).toISOString();
                    if (!post?.reactions)
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        };
                    return post;
                });
                // setAll normalizes data
                return postsAdapter.setAll(initialState, loadedPosts);
            },
            providesTags: (result, error, arg) => [
                { type: 'Post', id: 'LIST' },
                ...result.ids.map((id) => ({ type: 'Post', id })),
            ],
        }),
        getPostsByUserId: builder.query({
            query: (id) => `/posts/?userId=${id}`,
            transformResponse: (responseData) => {
                let min = 1;
                const loadedPosts = responseData.map((post) => {
                    if (!post?.date)
                        post.date = sub(new Date(), {
                            minutes: min++,
                        }).toISOString();
                    if (!post?.reactions)
                        post.reactions = {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0,
                        };
                    return post;
                });
                console.log(
                    '🚀 ~ file: postsSlice.js:271 ~ loadedPosts ~ loadedPosts:',
                    loadedPosts
                );
                return postsAdapter.setAll(initialState, loadedPosts); //does overwrite cache state for full list of post, redux is subscribing to different queries, showin in dev tools, cache state for specific query, normalized state with postAdapter.
            },
            providesTags: (result, error, arg) => {
                console.log(result);
                return [...result.ids.map((id) => ({ type: 'Post', id }))];
            },
        }),
        addNewPost: builder.mutation({
            query: (initialPost) => ({
                url: '/posts',
                method: 'POST',
                body: {
                    ...initialPost,
                    userId: Number(initialPost.userId),
                    date: new Date().toISOString(),
                    reactions: {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0,
                    },
                },
            }),
            invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),
        updatePost: builder.mutation({
            query: (initialPost) => ({
                url: `/posts/${initialPost.id}`,
                method: 'PUT',
                body: {
                    ...initialPost,
                    date: new Date().toISOString(),
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id },
            ],
        }),
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}`,
                method: 'DELETE',
                body: { id },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id },
            ],
        }),
        addReaction: builder.mutation({
            query: ({ postId, reactions }) => ({
                url: `posts/${postId}`,
                method: 'PATCH',
                // In a real app, we'd probably need to base this on user ID somehow
                // so that a user can't do the same reaction more than once
                body: { reactions },
            }),
            async onQueryStarted(
                { postId, reactions },
                { dispatch, queryFulfilled }
            ) {
                // updateQueryData requires the endpoint name and cache key arguments,
                // so it knows which piece of cache state to update

                // optimistic update
                // no invalidate tags necessary as we don't want to invalidate any post or list
                const patchResult = dispatch(
                    extendedApiSlice.util.updateQueryData(
                        'getPosts',
                        'getPosts',
                        (draft) => {
                            // The draft is Immer-wrapped and can be mutated like in createslice
                            const post = draft.entities[postId];
                            if (post) post.reactions = reactions;
                        }
                    )
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostsByUserIdQuery,
    useAddNewPostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddReactionMutation,
} = extendedApiSlice;
// export const { increaseCount, reactionAdded } = postsSlice.actions; //createslice AUTOMATICALLY generates an action createor function with the same name

// returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();
console.log(
    '🚀 ~ file: postsSlice.js:268 ~ electPostsResult:',
    selectPostsResult
);

// Creates memoized selector
// const selectPostsData = createSelector(
//     selectPostsResult,
//     (postsResult) => postsResult.data //normalized state object with ids & entities
// );
// console.log('🚀 ~ file: postsSlice.js:275 ~ selectPostsData:', selectPostsData);

// // getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//     selectAll: selectAllPosts,
//     selectById: selectPostById,
//     selectIds: selectPostIds,
//     // Pass in a selector that returns the post slice of state
// } = postsAdapter.getSelectors(
//     (state) => selectPostsData(state) ?? initialState
// ); //could be null the first time

// // export const selectAllPosts = (state) => state.posts.posts;
// export const getPostsStatus = (state) => state.posts.status;
// export const getPostsError = (state) => state.posts.error;
// export const getCount = (state) => state.posts.count;
// // export const selectPostById = (state, postId) =>
// //     state.posts.posts.find((post) => post.id === postId);

// export const selectPostByUser = createSelector(
//     // they provide the next line with it's value
//     [selectAllPosts, (state, userId) => userId], //if posts or userId changes, only then reruns
//     (posts, userId) => posts.filter((post) => post.userId === userId)
// );
// export default postsSlice.reducer;
