import { useDispatch, useSelector } from 'react-redux';
import Post from './Post/Post';
import './styles.css';
import { useEffect } from 'react';
import useUser from '../../hooks/useUser';
import { getPosts } from '../../actions/posts';

// eslint-disable-next-line react/prop-types
const Posts = ({ setCurrentId, setPostModal }) => {
  const { userImg } = useUser();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);

  useEffect(() => {

    dispatch(getPosts());
  }, [dispatch, userImg]);


  if (!posts.length && !isLoading) return 'No posts';

  return (
    <div className="container mx-auto px-4">
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
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
