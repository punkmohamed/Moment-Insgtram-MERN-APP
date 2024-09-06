/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import memoriesLogo from '../../images/memoriesLogo.png';
import memoriesText from '../../images/memoriesText.png';
import './styles.css';
import useUser from '../../hooks/useUser';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AutoUserSearch from '../AutoUserSearch/AutoUserSearch';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const { logout, userImg } = useUser();
  const [showPopover, setShowPopover] = useState(false);
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
  }, [userImg, user, logout]);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [userImg]);

  return (
    <header className="bg-white shadow-md">
      {/* Top Navigation */}
      <nav className="hidden sm:flex items-center justify-between p-4">
        <div className='flex items-center space-x-10'>
          <Link to="/" className="flex items-center">
            <img src={memoriesText} alt="Memories Text" className="h-11 mr-2" />
            <img src={memoriesLogo} alt="Memories Logo" className="h-10" />
          </Link>
          <Link to='/'>
            <span className="ml-2 text-lg font-semibold">Home</span>
          </Link>
          <Link to='/accounts'>
            <span className="ml-2 text-lg font-semibold">Accounts</span>
          </Link>
        </div>
        <div className="flex items-center space-x-10">
          <AutoUserSearch />
          {user?.result ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {user?.result.imageUrl ? (
                  <div className='relative'>
                    <img
                      src={user?.result.imageUrl}
                      alt={user?.result.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="absolute bottom-0 left-6 w-4 h-4 mr-1 rounded-full bg-green-500 border-2 border-white"></div>
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-semibold">
                    {user?.result.name.charAt(0)}
                  </div>
                )}
                <Link to={`/profile/${user?.result.name}`}>
                  <span className="ml-2 text-lg font-semibold">{user?.result.name}</span>
                </Link>
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

      {/* Bottom Navigation (visible on small screens) */}
      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 bg-white border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600 sm:hidden">
        <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
          <Link to="/" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            <span className="sr-only">Home</span>
          </Link>

          {/* Other icons */}
          <Link to="/accounts" className="inline-flex flex-col items-center justify-center px-5 rounded-s-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <button className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
              <svg className="w-7 h-7 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm2 1H8a6 6 0 0 0-6 6v1h16v-1a6 6 0 0 0-6-6Z" clipRule="evenodd" />
              </svg>
              <span className="sr-only">Accounts</span>
            </button>
          </Link>
          <div className="flex items-center justify-center">
            <button type="button" className="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700">
              <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
              <span className="sr-only">New item</span>
            </button>
          </div>

          <button className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg className="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2" />
            </svg>
            <span className="sr-only">Settings</span>
          </button>

          {/* Profile section */}
          <Link to={`/profile/${user?.result?.name}`} className="inline-flex flex-col items-center justify-center px-5 rounded-e-full hover:bg-gray-50 dark:hover:bg-gray-800 group">
            {user?.result.imageUrl ? (
              <img src={user?.result.imageUrl} alt={user?.result.name} className="w-10 h-10 rounded-full mb-1" />
            ) : (
              <svg className="w-10 h-10 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm2 1H8a6 6 0 0 0-6 6v1h16v-1a6 6 0 0 0-6-6Z" clipRule="evenodd" />
              </svg>
            )}
            <span className="sr-only">Profile</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
