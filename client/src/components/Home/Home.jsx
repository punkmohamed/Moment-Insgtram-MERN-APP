import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
import './styles.css';
import { useDispatch } from 'react-redux';
import usePost from '../../hooks/usePost';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
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

  return (
    <div className="min-h-screen bg-gray-100 p-4">
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
          </div>
          <Form currentId={currentId} setCurrentId={setCurrentId} setPostModal={setPostModal} postModal={postModal} />
          {(!searchQuery && !tags.length) && (
            <div className="bg-white shadow-md rounded-lg p-4 mt-4">
              <Pagination page={page} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
