import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import LoadingOverlay from '../components/LoadingOverlay';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const response = await fetch('https://pocketguruai.com/api/check-authentication', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
        credentials: 'include',
      })
        .then((response) => response.json())
        .then(function (data) {
          if (data.authenticated === true) {
            navigate('/dashboard');
          }
        })
        .catch(function (error) {});
    };
    checkAuthentication();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create a login request object
    const loginData = {
      email,
      password,
    };

    // Send the login request to the server using fetch or your preferred HTTP client library
    const response = await fetch('https://pocketguruai.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(loginData),
    })
      .then((response) => response.json())
      .then(function (data) {
        if (data.error) {
          // Handle the error response
          setErrorMessage(data.error);
        } else {
          // Handle the successful login response
          const accessToken = data.access_token;
          // Set the access token in local storage
          localStorage.setItem('access_token', accessToken);
          navigate('/dashboard');
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        alert('Login failed. Please try again.');
        console.error(error);
      });

    setIsLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full mx-6 md:w-1/2 max-w-md lg:w-1/3 bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form id="loginForm" onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
          </div>
          <div>
            <Link to="/register" className="text-blue-500">
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      </div>
      {isLoading && <LoadingOverlay />}
    </div>
  );
}
