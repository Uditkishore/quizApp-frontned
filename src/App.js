import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { getUserDetails, isTokenValid } from './utils/auth';
import QuizList from './components/QuizList';
// import QuizForm from './components/QuizForm';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/slice/userSlice';
import './App.css';
import QuizForm from './components/QuizForm';
import AminPage from './pages/Admin';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAdmin } = useSelector(state => state.user)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserDetails = async (token) => {
    try {
      const user = await getUserDetails(token);
      user.token = token;
      dispatch(setUser(user));
      setLoading(false)
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!isTokenValid(token)) {
      navigate('/login');
    } else {
      fetchUserDetails(token);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="App loading-container">
        <div className="spinner-border text-dark" role="status">
          <span className="sr-only"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="App">Error: {error}</div>;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Signup />} />
        <Route path="/" element={<QuizList />} />
        {isAdmin && <Route path="/create" element={<QuizForm />} />}
        {isAdmin && <Route path="/admin" element={<AminPage />} />}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
