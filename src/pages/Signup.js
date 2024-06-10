import axios from 'axios';
import React, { useState } from 'react';
import { baseUrl } from '../api';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let { data } = await axios.post(`${baseUrl}/api/user/signup`, { name, email, password })
      console.log('data', data);
      if (data.status) {
        toast("Hurrraayy, Start login!");
        navigate('/login');
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
              </button>
              <p className="mb-3 text-center">or Login with Email</p> */}

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="=name" className="form-label">
                    Name
                  </label>
                  <input
                    type="name"
                    className="form-control"
                    id="name"
                    placeholder="E.g. johndoe@email.com"
                    value={email}
                    onChange={handleNameChange}
                    required
                  />
                </div>
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
                Want to signin?{' '}
                <Link to="/login" className="text-decoration-none ms-1">
                  Visit Login Page
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
