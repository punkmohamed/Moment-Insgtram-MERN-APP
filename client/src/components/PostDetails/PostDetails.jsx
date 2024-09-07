import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import './styles.css';
import PostDetailsLoader from '../Loaders/PostDetailsLoader';

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  const openPost = (_id) => history(`/posts/${_id}`);




  const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

  if (isLoading)
    return <PostDetailsLoader />
  if (!post) return <PostDetailsLoader />
  return (
    <div className="m-20 p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 items-center gap-6">

      <div className="relative">
        <img
          className="w-full h-96 object-cover rounded-lg"
          src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
          alt={post.title}
        />
      </div>

      <div className="text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start">
          {post?.creator?.imageUrl ? <img
            className="w-12 h-12 rounded-full object-cover mr-4"
            src={post?.creator?.imageUrl}
            alt={post.name}
          /> : <div className="mr-4 size-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-semibold transition-transform duration-300 ease-in-out transform hover:scale-110">
            {post?.creator?.name.charAt(0).toUpperCase()}
          </div>
          }

          <div>
            <Link to={`/creators/${post.name}`}>
              <h4 className="text-lg font-bold">{post.name}</h4>
            </Link>
            <p className="text-sm text-gray-500">
              {moment(post.createdAt).format('DD MMMM YYYY')}
            </p>
          </div>
        </div>

        <p className="mt-4 text-gray-600 break-words max-w-md">
          {post.message}
        </p>

        <div className="mt-6 max-h-100 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 rounded-lg p-4">
          <CommentSection post={post} />
        </div>
      </div>
      {/* {!!recommendedPosts.length && (
        <div className="mt-6">
          <h5 className="text-xl font-bold mb-4">You might also like:</h5>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div
                key={_id}
                className="p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer hover:bg-gray-200"
                onClick={() => openPost(_id)}
              >
                <h6 className="text-lg font-semibold mb-2">{title}</h6>
                <p className="text-sm text-gray-600 mb-2">{name}</p>
                <p className="text-sm text-gray-600 mb-2">{message}</p>
                <p className="text-sm font-medium mb-2">Likes: {likes.length}</p>
                <img src={selectedFile} className="w-full h-32 object-cover rounded-lg" alt={title} />
              </div>
            ))}
          </div>
        </div>
      )} */}
    </div>

  );
};

export default Post;
