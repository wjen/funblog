import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserById } from './usersSlice';
import { selectAllPosts, selectPostByUser } from '../posts/postsSlice';
import { Link, useParams } from 'react-router-dom';

const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector((state) => selectUserById(state, Number(userId)));

    // useSelector runs everytime an action is dispatched
    //forces the component to rerender if a new reference value is returned,
    // filter returns new array - fix in postslice by creating memoized selector
    const postsForUser = useSelector((state) =>
        selectPostByUser(state, Number(userId))
    );

    const postTitles = postsForUser.map((post) => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ));

    return (
        <section>
            <h2>{user?.name}</h2>
            <ol>{postTitles}</ol>
        </section>
    );
};

export default UserPage;
