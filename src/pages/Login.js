import axios from 'axios';
import React, { useState } from 'react';
import { baseUrl } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let { data } = await axios.post(`${baseUrl}/api/user/login`, { email, password })
      if (data.status) {
        localStorage.setItem("token", JSON.stringify(data.token))
        toast("Wow so easy!");
        navigate('/');
      }
    } catch (error) {
      console.log('error', error);
    }

  };

  return (
    <div className="container py-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="card-title mb-4 text-center">Login</h1>
              <p className="mb-3 text-center">Hi, Welcome back 👋</p>
              {/* <button className="btn btn-outline-secondary mb-3 w-100">
                <i className="fab fa-google"></i> Login with Google
              </button> */}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="E.g. johndoe@email.com"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-check mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>
              <p className="mt-3 text-center">
                Forgot Password?
                <a href="#" className="text-decoration-none ms-1">
                  Click here
                </a>
              </p>
              <p className="mt-3 text-center">
                Not registered yet?{' '}
                <a href="#" className="text-decoration-none ms-1">
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
