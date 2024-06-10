import React, { useState } from 'react';
import { baseUrl } from '../api';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const FormComponent = () => {
    const [formData, setFormData] = useState({
        question: '',
        options: ['', '', '', ''],
        answer: ''
    });



    const handleQuestionChange = (e) => {
        setFormData({
            ...formData,
            question: e.target.value,
        });
    };

    const handleOptionChange = (index, e) => {
        const newOptions = [...formData.options];
        newOptions[index] = e.target.value;
        setFormData({
            ...formData,
            options: newOptions,
        });
    };

    const handleAnswerChange = (e) => {
        setFormData({
            ...formData,
            answer: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const apiEndpoint = `${baseUrl}/api/quiz/create`;

        fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                toast('Success');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="container mt-5">
            <ToastContainer />
            <h2>Submit Question</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="question" className="form-label">Question:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="question"
                        name="question"
                        value={formData.question}
                        onChange={handleQuestionChange}
                        required
                    />
                </div>
                {formData.options.map((option, index) => (
                    <div className="mb-3" key={index}>
                        <label htmlFor={`option${index}`} className="form-label">Option {index + 1}:</label>
                        <input
                            type="text"
                            className="form-control"
                            id={`option${index}`}
                            name={`option${index}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e)}
                            required
                        />
                    </div>
                ))}
                <div className="mb-3">
                    <label htmlFor="answer" className="form-label">Answer:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="answer"
                        name="answer"
                        value={formData.answer}
                        onChange={handleAnswerChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default FormComponent;
