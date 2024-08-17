import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, Link, useNavigate } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../actions/posts';
import CommentSection from './CommentSection';
import './styles.css';

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

  if (!post) return null;

  const openPost = (_id) => history(`/posts/${_id}`);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
          <h6 className="text-lg text-blue-600 mb-2">
            {post.tags.map((tag) => (
              <Link key={tag} to={`/tags/${tag}`} className="mr-2">
                {`#${tag}`}
              </Link>
            ))}
          </h6>
          <p className="text-base mb-4">{post.message}</p>
          <h6 className="text-lg">
            Created by:
            <Link to={`/creators/${post.name}`} className="text-blue-600">
              {` ${post.name}`}
            </Link>
          </h6>
          <p className="text-base text-gray-600">{moment(post.createdAt).fromNow()}</p>
          <div className="my-6 border-t border-gray-300"></div>
          <CommentSection post={post} />
          <div className="my-6 border-t border-gray-300"></div>
        </div>
        <div className="flex-1">
          <img
            className="w-full h-64 object-cover rounded-lg"
            src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
            alt={post.title}
          />
        </div>
      </div>
      {!!recommendedPosts.length && (
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
      )}
    </div>
  );
};

export default Post;
