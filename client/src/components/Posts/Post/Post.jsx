/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { likePost, deletePost, getUserCommentedPosts, getUserLikedPosts } from '../../../actions/posts';
import './styles.css';
import { Modal, Button } from 'flowbite-react';
import CommentSection from '../../PostDetails/CommentSection';
import ItemComponent from '../../Accounts/ItemComponents';

const Post = ({ post, setCurrentId, setPostModal }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModall, setShowModall] = useState(false);

  const handleDelete = () => {
    dispatch(deletePost(post._id));
    setShowModal(false);
    setOpen(false);
    // if (user?.result?._id) {
    //   dispatch(getUserCommentedPosts(user?.result?._id));
    //   dispatch(getUserLikedPosts(user?.result?._id));
    // }
  };
  const handleToggleOpen = () => {
    setOpen(!open);
  };
  const handleUpdate = () => {
    setPostModal(true)
    setCurrentId(post._id);
    setOpen(false);
  };
  const userId = user?.result.googleId || user?.result._id;
  const hasLikedPost = post.likes?.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));
    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }

  };

  // const Likes = () => {
  //   if (likes.length > 0) {
  //     return likes.find((like) => like === userId)
  //       ? (
  //         <><i className="fas fa-thumbs-up text-blue-500"></i>&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}`}</>
  //       ) : (
  //         <><i className="far fa-thumbs-up text-gray-500"></i>&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
  //       );
  //   }

  //   return <><i className="far fa-thumbs-up text-gray-500"></i>&nbsp;Like</>;
  // };

  const openPost = () => {
    history(`/posts/${post._id}`);
  };
  const isPostCreator = user?.result?.googleId === post?.creator || user?.result?._id === post?.creator._id;

  return (
    <div className="bg-gray-100 flex justify-center items-center p-4">

      <div className="max-w-sm w-full bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
        <div className="relative p-4">
          <span className='text-stone-400'>{moment(post.createdAt).fromNow()}</span>
          <span className="text-white text-xs font-bold rounded-lg bg-green-500 
          inline-block mt-4 ml-4 py-1.5 px-4 cursor-pointer">Home</span>
          <h1
            className="text-xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100"
          >
            {post.title}
          </h1>
          <p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">
            #{post.name}
          </p>

          {isPostCreator && (

            <div className="absolute top-4 right-4 hover:bg-slate-200 p-1 rounded-lg cursor-pointer">
              <div className="relative">
                <span onClick={handleToggleOpen}>
                  <svg
                    fill="currentColor"
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
                  </svg>
                </span>
                {open && (
                  <ItemComponent handleUpdate={handleUpdate} setShowModal={setShowModal} />
                )}
              </div>
            </div>
          )}
        </div>

        <img
          className="w-full h-48 object-cover cursor-pointer"
          src={post.selectedFile || 'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
          alt={post.title}
          onClick={openPost}
        />


        <div className="flex p-4 justify-between items-center">
          <div className="flex items-center space-x-2">
            {post?.creator?.imageUrl ? (
              <img
                className="w-10 h-10 rounded-full"
                src={post.creator.imageUrl}
                alt={post.name}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-semibold">
                {post?.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <h2 className="text-gray-800 font-bold cursor-pointer">{post.name}</h2>
          </div>

          <div className="flex space-x-2">
            <div className="flex space-x-1 items-center">
              <button onClick={handleLike} className="flex items-center space-x-1">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${post?.likes?.includes(user?.result?.googleId || user?.result?._id) ? 'text-red-500' : 'text-gray-500'} hover:text-red-400 transition duration-100 cursor-pointer`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </span>
                <span>{post?.likes?.length}</span>
              </button>
            </div>
            <div>
              <button
                className="flex space-x-1 items-center"
                onClick={() => setShowModall(true)}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-gray-600 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </span>
                <span>{post?.comments?.length}</span>
              </button>
              <Modal
                show={showModall}
                onClose={() => setShowModall(false)}
                size="xl"
                className="custom-modal"
              >
                <Modal.Header>Comments</Modal.Header>
                <Modal.Body>
                  <CommentSection post={post} />
                </Modal.Body>

              </Modal>
            </div>


          </div>
        </div>
      </div>

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this post?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button color="failure" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Post;