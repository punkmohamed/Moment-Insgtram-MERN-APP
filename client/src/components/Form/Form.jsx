import { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../../actions/posts';
import './styles.css';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const history = useNavigate();

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: [], selectedFile: '' });
  };

  useEffect(() => {
    if (!post?.title) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }, history));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-center">
          Please Sign In to create your own memories and like other memories.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <form autoComplete="off" noValidate className="space-y-4" onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold">{currentId ? `Editing "${post?.title}"` : 'Creating a Memory'}</h2>
        <div>
          <label htmlFor="title" className="block text-gray-700">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            className="w-full p-2 border rounded-lg"
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-gray-700">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            rows="4"
            className="w-full p-2 border rounded-lg"
            value={postData.message}
            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          type="submit"
        >
          Submit
        </button>
        <button
          className="w-full bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600"
          type="button"
          onClick={clear}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default Form;
