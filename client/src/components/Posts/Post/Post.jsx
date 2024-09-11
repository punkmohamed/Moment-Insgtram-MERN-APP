/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { likePost, deletePost, getUserCommentedPosts, getUserLikedPosts } from '../../../actions/posts';
import './styles.css';
import { Modal, Button } from 'flowbite-react';
import CommentSection from '../../PostDetails/CommentSection';
import ItemComponent from '../../Accounts/ItemComponents';
import { userList } from '../../../api';
import socket from '../../../socket.io/socket';
import { Link } from 'react-router-dom';

const Post = ({ post, setCurrentId, setPostModal }) => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showModall, setShowModall] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const characterLimit = 23;

  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {

    socket.on('likePost', (updatedPost) => {
      if (post._id === updatedPost._id) {
        dispatch({ type: 'LIKE', payload: updatedPost });
      }
    });


    return () => {
      socket.off('likePost');
    };
  }, [post._id, dispatch]);
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



  const handleLike = async () => {
    dispatch(likePost(post._id));
  };

  const users = useSelector((state) => state.auth.userList || []);
  const likedUserIds = post?.likes || [];

  const likedUserIdSet = new Set(likedUserIds);


  const usersWhoLiked = users?.users?.filter((user) => likedUserIdSet.has(user._id)).reverse() || [];



  const openPost = () => {
    history(`/posts/${post._id}`);
  };
  const isPostCreator = user?.result?.googleId === post?.creator || user?.result?._id === post?.creator._id;

  return (
    <div className="rounded-md shadow-md sm:w-96 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-2">
          {post?.creator?.imageUrl ? (
            <img src={post.creator.imageUrl}
              alt={post.name}
              className="object-cover object-center size-10 rounded-full shadow-sm bg-gray-500 dark:bg-gray-500 border-gray-700 dark:border-gray-300" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-semibold">
              {post?.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="-space-y-1">
            <div className='flex  items-center space-x-2'>
              <Link to={`/creators/${post.name}`}> <h2 className="text-lg font-semibold leading-none"> {post.name}</h2></Link>
              <span className='text-stone-400'>{moment(post.createdAt).fromNow()}</span>
            </div>

          </div>
        </div>
        {isPostCreator && (
          <div className=' relative'>
            <div className=''>
              <button title="Open options" type="button" onClick={handleToggleOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                  <path d="M256,144a64,64,0,1,0-64-64A64.072,64.072,0,0,0,256,144Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,256,48Z"></path>
                  <path d="M256,368a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,368Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,464Z"></path>
                  <path d="M256,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,288Z"></path>
                </svg>
                {open && (
                  <ItemComponent handleUpdate={handleUpdate} setShowModal={setShowModal} />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
      <img src={post.selectedFile || 'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
        alt={post.title}
        onClick={openPost}
        className="object-cover object-center w-full h-72 bg-gray-500 dark:bg-gray-500 cursor-pointer" />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={handleLike} className="flex items-center space-x-1">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${post?.likes?.includes(user?.result?.googleId || user?.result?._id) ? 'text-red-500' : 'text-gray-500'} hover:text-red-400 transition duration-100 cursor-pointer`} viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </span>
              <span>{post?.likes?.length}</span>
            </button>

            <button
              onClick={() => setShowModall(true)}
              type="button" title="Add a comment" className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                <path d="M496,496H480a273.39,273.39,0,0,1-179.025-66.782l-16.827-14.584C274.814,415.542,265.376,416,256,416c-63.527,0-123.385-20.431-168.548-57.529C41.375,320.623,16,270.025,16,216S41.375,111.377,87.452,73.529C132.615,36.431,192.473,16,256,16S379.385,36.431,424.548,73.529C470.625,111.377,496,161.975,496,216a171.161,171.161,0,0,1-21.077,82.151,201.505,201.505,0,0,1-47.065,57.537,285.22,285.22,0,0,0,63.455,97L496,457.373ZM294.456,381.222l27.477,23.814a241.379,241.379,0,0,0,135,57.86,317.5,317.5,0,0,1-62.617-105.583v0l-4.395-12.463,9.209-7.068C440.963,305.678,464,262.429,464,216c0-92.636-93.309-168-208-168S48,123.364,48,216s93.309,168,208,168a259.114,259.114,0,0,0,31.4-1.913Z"></path>
              </svg>
            </button>
            <span>{post?.comments?.length}</span>
            <button type="button" title="Share post" className="flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-5 h-5 fill-current">
                <path d="M474.444,19.857a20.336,20.336,0,0,0-21.592-2.781L33.737,213.8v38.066l176.037,70.414L322.69,496h38.074l120.3-455.4A20.342,20.342,0,0,0,474.444,19.857ZM337.257,459.693,240.2,310.37,389.553,146.788l-23.631-21.576L215.4,290.069,70.257,232.012,443.7,56.72Z"></path>
              </svg>
            </button>
          </div>
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
        <div className="flex flex-wrap items-center pt-3 pb-1">
          <div className="flex items-center space-x-2">
            {usersWhoLiked?.length > 0 && (
              <div className="flex -space-x-4 rtl:space-x-reverse">
                {usersWhoLiked?.slice(0, 3).map((user, index) => (
                  <img
                    key={index}
                    className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                    src={user?.imageUrl}
                    alt={`User ${index + 1}`}
                  />
                ))}
                {usersWhoLiked.length > 3 && (
                  <span className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
                    +{usersWhoLiked.length - 3}
                  </span>
                )}
              </div>
            )}
            {usersWhoLiked.length > 0 &&
              <span className="text-sm">Liked by
                <span className="font-semibold"> {usersWhoLiked[0]?.name}</span>
                {usersWhoLiked.length > 3 && (
                  <>
                    and
                    <span className="font-semibold">{usersWhoLiked.length - 3} others</span>
                  </>
                )}
              </span>
            }
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-sm ms-2 text-start break-words">
            <span className="text-base font-semibold mr-2">{post.name}</span>
            {isExpanded || post.title.length <= characterLimit
              ? post.title
              : `${post.title.slice(0, characterLimit)}...`}
            {post.title.length > characterLimit && (
              <button
                className="text-blue-500 hover:underline ms-2 text-sm"
                onClick={toggleText}
              >
                {isExpanded ? 'Less' : 'More'}
              </button>
            )}
          </p>


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
    // <div className="bg-gray-100 flex justify-center items-center p-4">

    //   <div className="max-w-sm w-full bg-white rounded-xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden">
    //     <div className="relative p-4">
    //       {usersWhoLiked?.length > 0 && (
    //         <div className="flex -space-x-4 rtl:space-x-reverse">
    //           {usersWhoLiked?.slice(0, 3).map((user, index) => (
    //             <img
    //               key={index}
    //               className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
    //               src={user?.imageUrl}
    //               alt={`User ${index + 1}`}
    //             />
    //           ))}
    //           {usersWhoLiked.length > 3 && (
    //             <span className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800">
    //               +{usersWhoLiked.length - 3}
    //             </span>
    //           )}
    //         </div>
    //       )}

    //       <span className='text-stone-400'>{moment(post.createdAt).fromNow()}</span>
    //       <span className="text-white text-xs font-bold rounded-lg bg-green-500 
    //       inline-block mt-4 ml-4 py-1.5 px-4 cursor-pointer">Home</span>
    //       <h1
    //         className="text-xl mt-2 ml-4 font-bold text-gray-800 cursor-pointer hover:text-gray-900 transition duration-100"
    //       >
    //         {post.title}
    //       </h1>
    //       <p className="ml-4 mt-1 mb-2 text-gray-700 hover:underline cursor-pointer">
    //         #{post.name}
    //       </p>

    //       {isPostCreator && (

    //         <div className="absolute top-4 right-4 hover:bg-slate-200 p-1 rounded-lg cursor-pointer">
    //           <div className="relative">
    //             <span onClick={handleToggleOpen}>
    //               <svg
    //                 fill="currentColor"
    //                 className="w-5 h-5"
    //                 viewBox="0 0 20 20"
    //               >
    //                 <path d="M10 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
    //               </svg>
    //             </span>
    //             {open && (
    //               <ItemComponent handleUpdate={handleUpdate} setShowModal={setShowModal} />
    //             )}
    //           </div>
    //         </div>
    //       )}
    //     </div>

    //     <img
    //       className="w-full h-48 object-cover cursor-pointer"
    //       src={post.selectedFile || 'https://images.unsplash.com/photo-1525268771113-32d9e9021a97?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
    //       alt={post.title}
    //       onClick={openPost}
    //     />


    //     <div className="flex p-4 justify-between items-center">
    //       <div className="flex items-center space-x-2">
    //         {post?.creator?.imageUrl ? (
    //           <img
    //             className="w-10 h-10 rounded-full"
    //             src={post.creator.imageUrl}
    //             alt={post.name}
    //           />
    //         ) : (
    //           <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-semibold">
    //             {post?.name?.charAt(0).toUpperCase()}
    //           </div>
    //         )}
    //         <h2 className="text-gray-800 font-bold cursor-pointer">{post.name}</h2>
    //       </div>

    //       <div className="flex space-x-2">
    //         <div className="flex space-x-1 items-center">
    //           <button onClick={handleLike} className="flex items-center space-x-1">
    //             <span>
    //               <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${post?.likes?.includes(user?.result?.googleId || user?.result?._id) ? 'text-red-500' : 'text-gray-500'} hover:text-red-400 transition duration-100 cursor-pointer`} viewBox="0 0 20 20" fill="currentColor">
    //                 <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    //               </svg>
    //             </span>
    //             <span>{post?.likes?.length}</span>
    //           </button>
    //         </div>
    //         <div>
    //           <button
    //             className="flex space-x-1 items-center"
    //             onClick={() => setShowModall(true)}
    //           >
    //             <span>
    //               <svg
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 className="h-7 w-7 text-gray-600 cursor-pointer"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke="currentColor"
    //               >
    //                 <path
    //                   strokeLinecap="round"
    //                   strokeLinejoin="round"
    //                   strokeWidth="2"
    //                   d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    //                 />
    //               </svg>
    //             </span>
    //             <span>{post?.comments?.length}</span>
    //           </button>
    //           <Modal
    //             show={showModall}
    //             onClose={() => setShowModall(false)}
    //             size="xl"
    //             className="custom-modal"
    //           >
    //             <Modal.Header>Comments</Modal.Header>
    //             <Modal.Body>
    //               <CommentSection post={post} />
    //             </Modal.Body>

    //           </Modal>
    //         </div>


    //       </div>
    //     </div>
    //   </div>

    //   <Modal show={showModal} onClose={() => setShowModal(false)}>
    //     <Modal.Header>Confirm Delete</Modal.Header>
    //     <Modal.Body>
    //       <p>Are you sure you want to delete this post?</p>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       <Button color="gray" onClick={() => setShowModal(false)}>
    //         Cancel
    //       </Button>
    //       <Button color="failure" onClick={handleDelete}>
    //         Delete
    //       </Button>
    //     </Modal.Footer>
    //   </Modal>
    // </div>
  );
};

export default Post;