import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPosts } from '../actions/posts';
import './styles.css';

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [dispatch, page]);

  const handlePageChange = (newPage) => {
    dispatch(getPosts(newPage));
  };

  return (
    <div className="flex justify-center mt-8">
      <nav aria-label="Page navigation">
        <ul className="flex list-none">
          <li>
            <Link
              to={`/posts?page=${page > 1 ? page - 1 : 1}`}
              onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
              className="px-4 py-2 border border-gray-300 rounded-l-md bg-white text-gray-500 hover:bg-gray-100"
            >
              Previous
            </Link>
          </li>
          {Array.from({ length: numberOfPages }, (_, index) => (
            <li key={index}>
              <Link
                to={`/posts?page=${index + 1}`}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 border border-gray-300 ${Number(page) === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-gray-500'} hover:bg-blue-100`}
              >
                {index + 1}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to={`/posts?page=${page < numberOfPages ? page + 1 : numberOfPages}`}
              onClick={() => handlePageChange(page < numberOfPages ? page + 1 : numberOfPages)}
              className="px-4 py-2 border border-gray-300 rounded-r-md bg-white text-gray-500 hover:bg-gray-100"
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Paginate;
