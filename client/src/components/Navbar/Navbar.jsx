import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import * as actionType from '../../constants/actionTypes';
import './styles.css';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useNavigate();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    history('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    const tokenCheckTimeout = setTimeout(() => {
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 < new Date().getTime()) {
            logout();
          }
        } catch (error) {
          console.log("Token decoding failed:", error);
          logout();
        }
      }
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, 500);
    return () => clearTimeout(tokenCheckTimeout);
  }, [location]);

  return (
    <header className="bg-white shadow-md">
      <nav className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <img src={memoriesText} alt="Memories Text" className="h-11 mr-2" />
          <img src={memoriesLogo} alt="Memories Logo" className="h-10" />
        </Link>
        <div className="flex items-center">
          {user?.result ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img
                  src={user?.result.imageUrl}
                  alt={user?.result.name}
                  className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-semibold"
                >
                  {user?.result.name.charAt(0)}
                </img>
                <span className="ml-2 text-lg font-semibold">{user?.result.name}</span>
              </div>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
