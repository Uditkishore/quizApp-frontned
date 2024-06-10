import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './QuizList.css';

import { baseUrl } from '../api';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const QuizList = () => {
    const navigate = useNavigate();
    const { loading, userData } = useSelector(state => state.user)
    const [quizzes, setQuizzes] = useState([]);
    const [isCorrect, setIsCorrect] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({});
    const [disabledQuizzes, setDisabledQuizzes] = useState({});
    const [correctCount, setCorrectCount] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(localStorage.getItem('submitted') === 'false');
    const attemptedQuestionsRef = useRef([]);

    useEffect(() => {
        axios.get(`${baseUrl}/api/quiz/all`)
            .then(res => setQuizzes(res.data))
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

    const handleLogout = ()=> {localStorage.clear(); navigate('/login')}

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
        <div className="quiz-container">
            <ToastContainer />
            {isSubmitted ? (
                <div>
                    <div className='d-flex justify-content-between'>
                        <p className="result">Total Score: {correctCount}/100</p>
                        <p className="result">Welcone Back <b>{userData.user.name} 👋</b></p>
                    </div>
                    <ul className="quiz-list">
                        <p>You have already submited your response !</p>
                        <b>Check the currect answers: </b>
                        {quizzes.map(quiz => (
                            <li key={quiz._id} className="quiz-item">
                                <p className="question">{quiz.question}</p>
                                <p className="answer">Correct Answer: <i>{quiz.answer}</i></p>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <>
                <div className='d-flex justify-content-between align-items-baseline'>
                <p className="result">Welcone Back <b>{userData.user.name}👋</b></p>
                <button onClick={handleLogout} className='btn btn-secondary btn-sm'>Logout</button>
                </div>
                    <ol className="quiz-list">
                        {quizzes.map(quiz => (
                            <li key={quiz._id} className="quiz-item">
                                <p className="question">{quiz.question}</p>
                                <ul className="option-list px-3">
                                    {quiz.options.map((option, index) => {
                                        const isSelected = selectedOptions[quiz._id] === option;
                                        const buttonClass = isSelected ? (isCorrect[quiz._id] ? 'option-button selected correct' : 'option-button selected incorrect') : 'option-button';
                                        const isDisabled = disabledQuizzes[quiz._id] || isSubmitted;

                                        return (
                                            <li type="a" key={index} className="option-item">
                                                <button
                                                    onClick={() => handleSelect(quiz._id, option, quiz.answer)}
                                                    className={buttonClass}
                                                    disabled={isDisabled}
                                                >
                                                    {option}
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </>
            )}
            {!isSubmitted && (
                <button className="submit-button" onClick={handleSubmit}>Submit</button>
            )}
        </div>
    );
};

export default QuizList;
