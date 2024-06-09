import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './QuizList.css';

import { baseUrl } from '../api';
import { useSelector } from 'react-redux';

const QuizList = () => {
    const { user } = useSelector(state => state.user.userData)
    const [quizzes, setQuizzes] = useState([]);
    const [isCorrect, setIsCorrect] = useState({});
    const [selectedOptions, setSelectedOptions] = useState({});
    const [disabledQuizzes, setDisabledQuizzes] = useState({});
    const [correctCount, setCorrectCount] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(localStorage.getItem('submitted') === 'true');
    const attemptedQuestionsRef = useRef([]);

    useEffect(() => {
        axios.get(`${baseUrl}/api/quiz/all`)
            .then(res => setQuizzes(res.data))
            .catch(err => {
                console.error('Error fetching quizzes:', err);
            });
    }, [isSubmitted]);

    useEffect(() => {
        localStorage.setItem('selectedOptions', JSON.stringify(selectedOptions));
    }, [selectedOptions]);

    useEffect(() => {
        localStorage.setItem('isCorrect', JSON.stringify(isCorrect));
    }, [isCorrect]);

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
        localStorage.setItem('submitted', 'true');
        setIsSubmitted(true);
    };

    return (
        <div className="quiz-container">
            {isSubmitted ? (
                <div>
                    <div className='d-flex justify-content-between'>
                        <p className="result">Total Score: {correctCount}/100</p>
                        <p className="result">Welcone Back <b>{user.name}👋</b></p>
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
                    <p className="result">Welcone Back <b>{user.name}👋</b></p>
                    <ol className="quiz-list">
                        {quizzes.map(quiz => (
                            <li key={quiz._id} className="quiz-item">
                                <p className="question">{quiz.question}</p>
                                <ul className="option-list">
                                    {quiz.options.map((option, index) => {
                                        const isSelected = selectedOptions[quiz._id] === option;
                                        const buttonClass = isSelected ? (isCorrect[quiz._id] ? 'option-button selected correct' : 'option-button selected incorrect') : 'option-button';
                                        const isDisabled = disabledQuizzes[quiz._id] || isSubmitted;

                                        return (
                                            <li key={index} className="option-item">
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
