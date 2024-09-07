import { useDispatch, useSelector } from 'react-redux';
import Post from './Post/Post';
import './styles.css';
import { useEffect } from 'react';
import useUser from '../../hooks/useUser';
import { getPosts } from '../../actions/posts';
import PostLoader from '../Loaders/PostLoader';

// eslint-disable-next-line react/prop-types
const Posts = ({ setCurrentId, setPostModal }) => {
  const { userImg } = useUser();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  console.log(posts);

  useEffect(() => {

    dispatch(getPosts());
  }, [dispatch, userImg]);


  if (!posts.length && !isLoading) return 'No posts';

  return (
    <div className="container mx-auto px-4">
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <PostLoader />
          <PostLoader />
          <PostLoader />
          <PostLoader />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 w-full px-4">
          {posts?.map((post) => (
            <Post key={post._id} post={post} setCurrentId={setCurrentId} setPostModal={setPostModal} />
          ))}
        </div>

      )}
    </div>
  );
};

export default Posts;
