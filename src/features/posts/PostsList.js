// import { useSelector } from 'react-redux';
// import { selectPostIds, getPostsStatus, getPostsError } from './postsSlice';
// import { selectPostIds, selectAllPosts } from './postsSlice';
import PostsExcerpt from './PostsExcerpt';
import { useGetPostsQuery } from './postsSlice';

const PostsList = () => {
    // const posts = useSelector(selectAllPosts);
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetPostsQuery('getPosts');
    // const orderedPostIds = useSelector(selectPostIds);

    // const postStatus = useSelector(getPostsStatus);
    // const error = useSelector(getPostsError);

    let content;
    if (isLoading) {
        content = <p>"Loading..."</p>;
    } else if (isSuccess) {
        // sort is now automatic inside the create entity adapter inside the post slice
        // const orderedPosts = posts
        //     .slice()
        //     .sort((a, b) => b.date.localeCompare(a.date));
        content = posts.ids.map((postId) => (
            <PostsExcerpt key={postId} postId={postId} />
        ));
        // content = orderedPostIds.map((postId) => (
        //     <PostsExcerpt key={postId} postId={postId} />
        // ));
        // } else if (postStatus === 'failed') {
    } else if (isError) {
        content = <p>{error}</p>;
    }

    return <section>{content}</section>;
};
export default PostsList;
