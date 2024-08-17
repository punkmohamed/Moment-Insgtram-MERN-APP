import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => {
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    if (name === 'password') {
      setInputType(inputType === 'password' ? 'text' : 'password');
      handleShowPassword();
    }
  };

  return (
    <div className={`flex flex-col ${half ? 'sm:w-1/2' : 'w-full'} mb-4`}>
      <label className="text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          name={name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus={autoFocus}
          type={inputType}
        />
        {name === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <FontAwesomeIcon icon={inputType === 'password' ? faEye : faEyeSlash} className="h-5 w-5 text-gray-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
