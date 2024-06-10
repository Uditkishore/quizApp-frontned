import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './QuizList.css';

import { baseUrl } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { clearUser } from '../store/slice/userSlice';


const QuizList = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { userData, isAdmin } = useSelector(state => state.user)
    const [loading, setLoading] = useState(true);
    const [quizzes, setQuizzes] = useState([]);
    const [isCorrect, setIsCorrect] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({});
    const [disabledQuizzes, setDisabledQuizzes] = useState({});
    const [correctCount, setCorrectCount] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(localStorage.getItem('submitted') === 'false');

    useEffect(() => {
        axios.get(`${baseUrl}/api/quiz/all`)
            .then(res => {
                setQuizzes(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Error fetching quizzes:', err);
            });
    }, [isSubmitted]);

    const handleSelect = (quizId, option, answer) => {
        if (!isSubmitted) {
            setSelectedOptions(prevState => ({ ...prevState, [quizId]: option }));
            setIsCorrect(prevState => ({ ...prevState, [quizId]: option === answer }));
            setDisabledQuizzes(prevState => ({ ...prevState, [quizId]: true }));

            if (option === answer) {
                setCorrectCount(prevCount => prevCount + 10);
            }
        }
    };

    const handleSubmit = () => {
        if (Object.keys(selectedOptions).length === quizzes.length) {
            // localStorage.setItem('submitted', 'true');
            setIsSubmitted(true);
        } else {
            toast("Please attemp all the questions!")
        }
    };

    const handleLogout = () => { localStorage.clear(); navigate('/login'); dispatch(clearUser()) }
    const handleReset = () => { setIsSubmitted(false); setSelectedOptions({}); setDisabledQuizzes({}) }

    if (loading) {
        return (
            <div className="App loading-container">
                <div className="spinner-border text-dark" role="status">
                    <span className="sr-only"></span>
                </div>
            </div>
        );
    }

    return (
        <div className="container quiz-container py-3">
            <ToastContainer />
            {isSubmitted ? (
                <div>
                    <div className="d-flex justify-content-between flex-wrap">
                        <p className="result">Total Score: {correctCount}/100</p>
                        <p className="result">Welcome Back <b>{userData.name} 👋</b></p>
                    </div>
                    <ul className="quiz-list">
                        <p>You have already submitted your response!</p>
                        <div onClick={handleReset} className='d-flex justify-content-between align-items-center flex-wrap'>
                            <b>Check the correct answers:</b>
                            <button className='btn btn-success'>Reset</button>
                        </div>
                        {quizzes.map(quiz => (
                            <li key={quiz._id} className="quiz-item mt-3">
                                <p className="question">{quiz.question}</p>
                                <p className="answer">Correct Answer: <i>{quiz.answer}</i></p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <>
                    <div className="d-flex justify-content-between align-items-baseline flex-wrap">
                        <p className="result">Welcome Back <b>{userData.name} 👋</b></p>
                        <div className="d-flex gap-2">
                            {isAdmin && (
                                <Link to="/create" className="btn btn-secondary btn-sm">Add</Link>
                            )}
                            {isAdmin && (
                                <Link to="/admin" className="btn btn-secondary btn-sm">Modify</Link>
                            )}
                            <button onClick={handleLogout} className="btn btn-secondary btn-sm">Logout</button>
                        </div>
                    </div>
                    <ol className="quiz-list">
                        {quizzes.map(quiz => (
                            <li key={quiz._id} className="quiz-item mt-3">
                                <p className="question">{quiz.question}</p>
                                <ol className="option-list p-0">
                                    {quiz.options.map((option, index) => {
                                        const isSelected = selectedOptions[quiz._id] === option;
                                        const buttonClass = isSelected
                                            ? (isCorrect[quiz._id] ? 'option-button selected correct' : 'option-button selected incorrect')
                                            : 'option-button btn-sm';
                                        const isDisabled = disabledQuizzes[quiz._id] || isSubmitted;

                                        const serialNumber = String.fromCharCode(65 + index).toLowerCase();

                                        return (
                                            <li key={index} className="option-item list-unstyled">
                                                <button
                                                    onClick={() => handleSelect(quiz._id, option, quiz.answer)}
                                                    className={buttonClass}
                                                    disabled={isDisabled}
                                                >
                                                    {serialNumber}. &nbsp; {option}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ol>
                            </li>
                        ))}
                    </ol>
                </>
            )}
            {!isSubmitted && (
                <button className="submit-button btn btn-primary mt-4 btn-sm d-block" onClick={handleSubmit}>Submit</button>
            )}
        </div>

    );
};

export default QuizList;
