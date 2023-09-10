// import React from 'react';
// import { useSelector } from 'react-redux';
// import { selectAllUsers } from './usersSlice';
import { Link } from 'react-router-dom';
import { useGetUsersQuery } from './usersSlice';
const UsersList = () => {
    // const users = useSelector(selectAllUsers);
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery('getUsers');

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        const renderedUsers = users.ids.map((userId) => (
            <li key={userId}>
                <Link to={`/user/${userId}`}>
                    {users.entities[userId].name}
                </Link>
            </li>
        ));
        content = (
            <section>
                <h2>Users</h2>
                <ul>{renderedUsers}</ul>
            </section>
        );
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return content;
};

export default UsersList;
