// import React from 'react';
// import { useSelector } from 'react-redux';
// import { selectUserById } from './usersSlice';
// import { selectAllPosts, selectPostByUser } from '../posts/postsSlice';
import { Link, useParams } from 'react-router-dom';
import { useGetPostsByUserIdQuery } from '../posts/postsSlice';
import { useGetUsersQuery } from './usersSlice';

const UserPage = () => {
    const { userId } = useParams();
    // const user = useSelector((state) => selectUserById(state, Number(userId)));
    const {
        user,
        isLoading: isLoadingUser,
        isSuccess: isSuccessUser,
        isError: isErrorUser,
        error: errorUser,
    } = useGetUsersQuery('getUsers', {
        selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
            user: data?.entities[userId],
            isLoading,
            isSuccess,
            isError,
            error,
        }),
    });
    // useSelector runs everytime an action is dispatched
    //forces the component to rerender if a new reference value is returned,
    // filter returns new array - fix in postslice by creating memoized selector
    // const postsForUser = useSelector((state) =>
    //     selectPostByUser(state, Number(userId))
    // );
    const {
        data: postsForUser,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostsByUserIdQuery(userId);
    console.log(
        '🚀 ~ file: UserPage.js:40 ~ UserPage ~ postsForUser:',
        postsForUser
    );

    // const postTitles = postsForUser.map((post) => (
    //     <li key={post.id}>
    //         <Link to={`/post/${post.id}`}>{post.title}</Link>
    //     </li>
    // ));
    let content;
    if (isLoading || isLoadingUser) {
        content = <p>Loading...</p>;
    } else if (isSuccess && isSuccessUser) {
        const { ids, entities } = postsForUser;
        content = (
            <section>
                <h2>{user?.name}</h2>
                <ol>
                    {ids.map((id) => (
                        <li key={id}>
                            <Link to={`/post/${id}`}>{entities[id].title}</Link>
                        </li>
                    ))}
                </ol>
            </section>
        );
    } else if (isError || isErrorUser) {
        content = <p>{error || errorUser}</p>;
    }

    return content;
};

export default UserPage;
