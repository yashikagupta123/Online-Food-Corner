import { useEffect, useState } from 'react';
import logo from '../../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';

const SignInPage = (props) => {
  const { handleLogin } = props;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [pNumber, setPNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: false,
    pNumber: false,
    password: false,
  });

  const EMAIL_REGEX =
    /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  const PNUMBER_REGEX = /^[6-9]\d{9}$/;

  const PASSWORD_REGEX =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@%#!])[A-Za-z0-9@%#!]{8,}$/;

  const isEmailValid = (emailAddress) => {
    return EMAIL_REGEX.test(emailAddress);
  };
  const isPNumberValid = (phoneNumber) => {
    return PNUMBER_REGEX.test(phoneNumber);
  };
  const isPasswordValid = (psw) => {
    return PASSWORD_REGEX.test(psw);
  };

  const handleSignInBtnClick = () => {
    let isValid = true;
    const newError = { ...errors };
    newError.email = !isEmailValid(email);
    newError.pNumber = !isPNumberValid(pNumber);
    newError.password = !isPasswordValid(password);
    if (newError.email || newError.pNumber || newError.password) {
      isValid = false;
    }

    setErrors(newError);

    if (isValid) {
      handleLogin();
      navigate('/HomePage');
    }
  };

  console.log(errors);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="mb-6">
        <img
          src={logo}
          alt="MySwiggyClone Logo"
          className="w-24 h-20 hover:opacity-75 cursor-pointer"
        />
      </div>
      <h2 className="text-xl font-bold mb-6">Sign In</h2>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email Address *
          </label>
          <input
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
            type="email"
            placeholder="Enter your email"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-600' : ''}`}
          />
          <p className="text-xs text-red-600 mt-1">
            {errors.email ? 'Invalid Email' : ''}
          </p>
        </div>

        {/* Phone Number Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number *
          </label>
          <input
            onChange={(event) => {
              setPNumber(event.target.value);
            }}
            value={pNumber}
            type="tel"
            placeholder="Enter your phone number"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pNumber ? 'border-red-600' : ''}`}
          />
          <p className="text-xs text-red-600 mt-1">
            {errors.pNumber ? 'Invalid Phone Number' : ''}
          </p>
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password *
          </label>
          <input
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            type="password"
            placeholder="Enter your password"
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-600' : ''}`}
          />
          <p className="text-xs text-red-600 mt-1">
            {errors.password ? 'Invalid Password' : ''}
          </p>
        </div>

        {/* Sign In Button */}
        <button
          onClick={() => handleSignInBtnClick()}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignInPage;
