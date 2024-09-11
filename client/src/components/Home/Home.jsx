import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import './styles.css';
import { useDispatch } from 'react-redux';
import usePost from '../../hooks/usePost';
import useUser from '../../hooks/useUser';
import RightMembers from './../RightMembers/RightMembers';
import { Badge } from 'flowbite-react';
import ChatNotifictions from '../Notifictions/ChatNotifictions';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  const { user } = useUser()
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useNavigate();
  const { postModal, setPostModal } = usePost()
  const searchPost = () => {
    if (search.trim() || tags.length) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));
  const handleAddChip = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      setTags([...tags, e.target.value.trim()]);
      e.target.value = '';
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <div className='mx-auto w-100'>
        <div className='border-t-4 border-t-emerald-700 p-4 bg-white'>
          <div className='flex justify-between items-center'>
            <img
              src={user?.result.imageUrl}
              alt={user?.result.name}
              className="size-15 rounded-full object-cover"
            />
            <h1 className='font-bold text-lg'>what is on your mind?</h1>
            <Form currentId={currentId} setCurrentId={setCurrentId} setPostModal={setPostModal} postModal={postModal} />
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-wrap">
        <div className="w-full md:w-2/3 lg:w-3/4 p-4">
          <Posts setCurrentId={setCurrentId} setPostModal={setPostModal} />
        </div>
        <div className="w-full md:w-1/3 lg:w-1/4 p-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <input
              type="text"
              name="search"
              placeholder="Search Memories"
              className="w-full p-2 border rounded-lg mb-4"
              onKeyDown={handleKeyPress}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={searchPost}
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
            <div className="flex flex-wrap gap-2 mb-2 mt-4">
              {tags.map((tag, index) => (
                <Badge key={index} color="info" className="cursor-pointer p-2 font-bold text-sm" onClick={() => handleDeleteChip(tag)}>
                  {typeof tag === 'string' ? tag : JSON.stringify(tag)} &times;
                </Badge>
              ))}
            </div>

            <input
              type="text"
              placeholder="Add tags"
              onKeyDown={handleAddChip}
              className="w-full p-2 border rounded-lg"
            />
            <button
              onClick={searchPost}
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mt-4"
            >
              Search
            </button>

          </div>

          <RightMembers />
          {(!searchQuery && !tags.length) && (
            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
              <Pagination page={page} />
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default Home;
