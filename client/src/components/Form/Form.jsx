/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../../actions/posts';
import { Modal } from 'flowbite-react';
import './styles.css';

const Form = ({ currentId, setCurrentId, setPostModal, postModal }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: [], selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const [tagInput, setTagInput] = useState('');
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
      setPostModal(false)
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }, history));
      console.log(history);

      setPostModal(false)
      clear();
    }
  };
  const handlePost = () => {
    setPostModal(true)
    setCurrentId(0)
  }
  const handleAddChip = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (tagInput.trim()) {
        setPostData({ ...postData, tags: [...postData.tags, tagInput.trim()] });
        setTagInput('');
      }
    }
  };

  const handleDeleteChip = (chipToDelete) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
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
    <>

      <button onClick={handlePost} className='bg-green-300 text-white p-3 px-6 rounded-xl'> Post</button>
      <Modal
        show={postModal}
        onClose={() => setPostModal(false)}
        size="lg"
        className="custom-modal"
      >
        <form autoComplete="off" noValidate className="  overflow-y-auto" onSubmit={handleSubmit}>
          <Modal.Header></Modal.Header>
          <Modal.Body>
            <div className="form-preview">
              <div className="p-1 max-w-md mx-auto bg-white rounded-lg">
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
                <div className='my-3'>
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
                <label htmlFor="tags" className="block text-gray-700">Tags</label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  placeholder="Press enter to add a tag"
                  className="w-full p-2 border rounded-lg"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddChip}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {postData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-blue-200 text-blue-700 p-2 rounded-full cursor-pointer"
                      onClick={() => handleDeleteChip(tag)}
                    >
                      {tag} &times;
                    </span>
                  ))}
                </div>
                <div className="mb-4">
                  <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </div>
              </div>
              {postData.selectedFile && <img src={postData.selectedFile} alt="Profile Preview" className="profile-image-preview" />}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className=' flex  space-x-60'>
              <button type="submit" className="btn btn-primary px-7 bg-slate-800 text-white p-2 rounded-lg ">{currentId ? "Confirm Update" : "Post"}</button>
              <button
                className="w-full bg-red-500 text-white px-7  rounded-lg hover:bg-gray-600"
                type="button"
                onClick={clear}
              >Clear</button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default Form;
