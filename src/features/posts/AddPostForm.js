import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsAdded } from './postsSlice';
import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
    // using local state, these values won't be needed globally
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [userId, setUserId] = useState('');

    const users = useSelector(selectAllUsers);

    const dispatch = useDispatch();
    const onTitleChanged = (e) => setTitle(e.target.value);
    const onContentChanged = (e) => setContent(e.target.value);
    const onAuthorChanged = (e) => setUserId(e.target.value);
    const onSavePostClicked = (e) => {
        if (title && content) {
            dispatch(postsAdded(title, content, userId));
        }
        setTitle('');
        setContent('');
        setUserId('');
    };

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
    const userOptions = users.map((user) => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ));
    return (
        <section>
            <h2>Add a new Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={onTitleChanged}
                    id="postTitle"
                    name="postTitle"
                />
                <label htmlFor="postAuthor">Author:</label>
                <select
                    name="postAuthor"
                    id="postAuthor"
                    onChange={onAuthorChanged}
                >
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    name="postContent"
                    id="postContent"
                    value={content}
                    onChange={onContentChanged}
                ></textarea>
                <button
                    type="button"
                    disabled={!canSave}
                    onClick={onSavePostClicked}
                >
                    Save Post
                </button>
            </form>
        </section>
    );
};

export default AddPostForm;
