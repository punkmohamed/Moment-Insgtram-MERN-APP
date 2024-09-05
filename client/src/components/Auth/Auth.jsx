import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signin, signup } from '../../actions/auth';
import { AUTH } from '../../constants/actionTypes';
import { jwtDecode } from 'jwt-decode';
import FileBase from 'react-file-base64';
import './styles.css';

const SignUp = () => {
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = (resetForm) => {
    setIsSignup(prevIsSignup => !prevIsSignup);
    setShowPassword(false);
    resetForm();
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

  const validationSchema = Yup.object({
    firstName: isSignup ? Yup.string().required('First name is required') : null,
    lastName: isSignup ? Yup.string().required('Last name is required') : null,
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: isSignup ? Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match') : null,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <FontAwesomeIcon icon={faLock} className="h-12 w-12 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6">{isSignup ? 'Sign up' : 'Sign in'}</h1>
        <Formik
          initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', imageUrl: '' }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            if (isSignup) {
              dispatch(signup(values, history));
            } else {
              dispatch(signin(values, history));
            }
            setSubmitting(false);
            resetForm();  // Reset the form after submission
          }}
        >
          {({ setFieldValue, resetForm }) => (
            <Form>
              <div className="space-y-4">
                {isSignup && (
                  <>
                    <div className="relative mb-4">
                      <Field name="firstName" type="text" className="peer w-full p-2 border rounded-md" />
                      <label htmlFor="firstName" className="absolute top-1/2 left-2 text-gray-500 transform -translate-y-1/2 peer-focus:-translate-y-6 peer-focus:text-blue-500 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-500">
                        First Name
                      </label>
                      <ErrorMessage name="firstName" component="div" className="text-red-600 text-sm" />
                    </div>
                    <div className="relative mb-4">
                      <Field name="lastName" type="text" className="peer w-full p-2 border rounded-md" />
                      <label htmlFor="lastName" className="absolute top-1/2 left-2 text-gray-500 transform -translate-y-1/2 peer-focus:-translate-y-6 peer-focus:text-blue-500 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-500">
                        Last Name
                      </label>
                      <ErrorMessage name="lastName" component="div" className="text-red-600 text-sm" />
                    </div>
                  </>
                )}
                <div className="relative mb-4">
                  <Field name="email" type="email" className="peer w-full p-2 border rounded-md" />
                  <label htmlFor="email" className="absolute top-1/2 left-2 text-gray-500 transform -translate-y-1/2 peer-focus:-translate-y-6 peer-focus:text-blue-500 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-500">
                    Email Address
                  </label>
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                </div>
                <div className="relative mb-4">
                  <Field name="password" type={showPassword ? 'text' : 'password'} className="peer w-full p-2 border rounded-md" />
                  <label htmlFor="password" className="absolute top-1/2 left-2 text-gray-500 transform -translate-y-1/2 peer-focus:-translate-y-6 peer-focus:text-blue-500 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-500">
                    Password
                  </label>
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                  <button
                    type="button"
                    onClick={handleShowPassword}
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                {isSignup && (
                  <div className="relative mb-4">
                    <Field name="confirmPassword" type="password" className="peer w-full p-2 border rounded-md" />
                    <label htmlFor="confirmPassword" className="absolute top-1/2 left-2 text-gray-500 transform -translate-y-1/2 peer-focus:-translate-y-6 peer-focus:text-blue-500 peer-placeholder-shown:translate-y-1/2 peer-placeholder-shown:text-gray-500">
                      Repeat Password
                    </label>
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm" />
                  </div>
                )}
                {isSignup && (
                  <div className="relative mb-4">
                    <label className="text-gray-700">Profile Picture</label>
                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setFieldValue('imageUrl', base64)} />
                  </div>
                )}
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
                    onClick={() => switchMode(resetForm)}
                    className="text-blue-500 hover:underline"
                  >
                    {isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
