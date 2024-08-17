import { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { likePost, deletePost } from '../../../actions/posts';
import './styles.css'; // Import the CSS file

const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useNavigate();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><i className="fas fa-thumbs-up text-blue-500"></i>&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
        ) : (
          <><i className="far fa-thumbs-up text-gray-500"></i>&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><i className="far fa-thumbs-up text-gray-500"></i>&nbsp;Like</>;
  };

  const openPost = () => {
    history(`/posts/${post._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <button
        onClick={openPost}
        className="w-full focus:outline-none"
      >
        <img
          className="w-full h-64 object-cover"
          src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}
          alt={post.title}
        />
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="text-lg font-semibold">{post.name}</div>
            <div className="text-sm text-gray-500">{moment(post.createdAt).fromNow()}</div>
          </div>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div className="absolute top-4 right-4">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentId(post._id);
                }}
                className="text-white"
              >
                <i className="fas fa-ellipsis-h"></i>
              </button>
            </div>
          )}
          <div className="mt-2 text-gray-600">{post.tags.map((tag) => `#${tag} `)}</div>
          <h2 className="text-xl font-bold mt-2">{post.title}</h2>
          <p className="text-gray-700 mt-2">{post.message.split(' ').splice(0, 20).join(' ')}...</p>
        </div>
      </button>
      <div className="flex justify-between items-center p-4 border-t border-gray-200">
        <button
          onClick={handleLike}
          className={`flex items-center ${user?.result ? 'text-blue-500' : 'text-gray-500'}`}
        >
          <Likes />
        </button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <button
            onClick={() => dispatch(deletePost(post._id))}
            className="flex items-center text-red-500"
          >
            <i className="fas fa-trash-alt"></i>&nbsp; Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Post;
