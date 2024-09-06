/* eslint-disable react/no-unknown-property */
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import EmojiMart from '@emoji-mart/react';
import { commentPost } from '../../actions/posts';
import './styles.css';
import FileBase from 'react-file-base64';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [loading, setLoading] = useState(false)
  const [comment, setComment] = useState({ message: '', selectedFile: '' });
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const commentsRef = useRef();
  useEffect(() => {
    if (commentsRef.current) {
      commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', });
    }
  }, [comments]);

  const handleComment = async () => {
    const commentData = `${user?.result?.name}: ${comment.message} ${comment.selectedFile ? ` [image] ${comment.selectedFile}` : ''}`;
    const newComments = await dispatch(commentPost(commentData, post._id));

    setComment({ message: '', selectedFile: '' });
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', });
  };
  const handleEmojiSelect = (emoji) => {
    setComment((prevComment) => ({
      ...prevComment,
      message: prevComment.message + emoji.native,
    }));
    setShowEmojiPicker(false);
  };


  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.querySelector('input').click();
  };
  return (
    <div className="py-4 px-6">
      <div className="flex flex-col">
        <div className="space-y-2">
          {comments?.map((c, i) => {
            const [nameAndMessage, image] = c.split(' [image]');
            const [name, message] = nameAndMessage.split(': ');
            return (
              <div className="flex items-start gap-2.5" key={i}>
                {!user?.result?.imageUrl ? <img src={user?.result?.imageUrl} className='size-10 rounded-full mr-2' alt="" /> :
                  <div className='w-8 h-8 rounded-full bg-green-600'>
                    <h1 className='text-center mt-1'>{name.charAt(0).toUpperCase()}</h1>
                  </div>
                }

                <div className="flex flex-col gap-1 ">
                  <div className="flex flex-col w-full max-w-[386px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                      {name === "undefined" ? <span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span> : <Link to={`/creators/${name}`}> <span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span></Link>}
                    </div>
                    <p className="text-sm font-normal text-gray-900 dark:text-white break-words max-w-md">{message}</p>
                    <div className="group relative my-2.5">
                      <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                        <button data-tooltip-target="download-image" className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50">
                          <svg className="w-5 h-5 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3" />
                          </svg>
                        </button>
                      </div>
                      {image && <img src={image} alt="comment" className="rounded-lg" />}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full write-comment-section">
        <h2 className="text-xl font-semibold mb-2">Write a comment</h2>
        <div className='flex relative'>
          <img src={user?.result?.imageUrl || 'https://via.placeholder.com/150'} className='size-10 rounded-full mr-2' alt="" />
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="4"
            placeholder="Comment"
            value={comment.message}
            onChange={(e) => setComment({ ...comment, message: e.target.value })}
          />
        </div>
        {comment?.selectedFile && <div className='ml-16 bg-slate-200 w-90 h-30 p-4 mt-3 rounded-lg flex items-center justify-between'>
          <img src={comment?.selectedFile} alt="comment" className="w-20 h-20 object-cover rounded-lg" />
          <button className='text-3xl bg-red-700 p-2 px-3 text-dark rounded-full' onClick={() => setComment({ ...comment, selectedFile: '' })}>X</button>
        </div>}
        <div className='flex justify-between items-center mt-2'>
          <div className='flex items-center align-middle ml-12 space-x-6'>
            <div className=' inline-block'>
              <FontAwesomeIcon
                icon={faImage}
                className='text-xl cursor-pointer'
                onClick={handleIconClick}
              />
              <div ref={fileInputRef} className='hidden'>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setComment({ ...comment, selectedFile: base64 })}
                />
              </div>
            </div>
            <div className='relative'>
              <button
                type=""
                className="  m-0 p-0  rounded-lg"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              >
                😊
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-7 ">
                  <EmojiMart
                    title="Pick your emoji…"
                    emojiSize={24}
                    onEmojiSelect={handleEmojiSelect}
                  />
                </div>
              )}
            </div>
          </div>
          <button
            className={`mt-2  py-2 px-4 text-white rounded-lg ${comment.message || comment.selectedFile ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
            onClick={handleComment}
            disabled={!comment.message && !comment.selectedFile}
          >
            Comment
          </button>
        </div>
      </div>
      <div ref={commentsRef} />
    </div>
  );
};

CommentSection.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentSection;
