import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import { jwtDecode } from 'jwt-decode';
import './styles.css'; // Import the CSS file

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup(prevIsSignup => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const googleSuccess = async (res) => {
    const token = res?.credential;
    const decodedToken = jwtDecode(token);
    const result = decodedToken;
    try {
      dispatch({ type: AUTH, data: { result, token } });
      history('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon icon={faLock} className="h-12 w-12 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">{isSignup ? 'Sign up' : 'Sign in'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            {isSignup && (
              <>
                <div className="flex flex-col">
                  <label className="text-gray-700">First Name</label>
                  <input
                    name="firstName"
                    onChange={handleChange}
                    placeholder="First Name"
                    className="p-2 border rounded-md"
                    autoFocus
                    type="text"
                    value={form.firstName}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-gray-700">Last Name</label>
                  <input
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Last Name"
                    className="p-2 border rounded-md"
                    type="text"
                    value={form.lastName}
                  />
                </div>
              </>
            )}
            <div className="flex flex-col">
              <label className="text-gray-700">Email Address</label>
              <input
                name="email"
                onChange={handleChange}
                placeholder="Email Address"
                className="p-2 border rounded-md"
                type="email"
                value={form.email}
              />
            </div>
            <div className="relative flex flex-col">
              <label className="text-gray-700">Password</label>
              <input
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="p-2 border rounded-md"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            {isSignup && (
              <div className="flex flex-col">
                <label className="text-gray-700">Repeat Password</label>
                <input
                  name="confirmPassword"
                  onChange={handleChange}
                  placeholder="Repeat Password"
                  className="p-2 border rounded-md"
                  type="password"
                  value={form.confirmPassword}
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full mt-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </button>
          <GoogleLogin
            render={(renderProps) => (
              <button
                className="w-full mt-4 py-2 bg-red-500 text-white rounded-md flex items-center justify-center"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Google Sign In
              </button>
            )}
            onSuccess={googleSuccess}
            onError={googleError}
            cookiePolicy="single_host_origin"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={switchMode}
              className="text-blue-500 hover:underline"
            >
              {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
