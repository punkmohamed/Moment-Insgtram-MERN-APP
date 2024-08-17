import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { commentPost } from '../../actions/posts';
import './styles.css';

const CommentSection = ({ post }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const [comments, setComments] = useState(post?.comments);
  const commentsRef = useRef();

  const handleComment = async () => {
    const newComments = await dispatch(commentPost(`${user?.result?.name}: ${comment}`, post._id));

    setComment('');
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-4 px-6">
      <div className="flex flex-col">
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Comments</h2>
          <div className="space-y-2">
            {comments?.map((c, i) => (
              <div key={i} className="text-base">
                <strong className="mr-1">{c.split(': ')[0]}</strong>
                {c.split(': ')[1]}
              </div>
            ))}
            <div ref={commentsRef} />
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-xl font-semibold mb-2">Write a comment</h2>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg"
            rows="4"
            placeholder="Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className={`mt-2 w-full py-2 px-4 text-white rounded-lg ${comment.length ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!comment.length}
            onClick={handleComment}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
