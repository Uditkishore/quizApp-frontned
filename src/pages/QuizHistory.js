import React, { useEffect, useState } from 'react';
import { baseUrl } from '../api';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const QuizHistory = () => {
    const { responseId } = useParams();
    const [loading, setLoading] = useState(true);
    const [responses, setResponses] = useState([]);

    const getResponses = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/score/response/${responseId}`);
            setResponses(data.data);
        } catch (error) {
            console.log('error', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        getResponses();
    }, []);

    if (loading) {
        return (
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-auto">
                        <div className="spinner-border text-dark" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row mt-4">
                <div className="col">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Response</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responses.length > 0 ? (
                                responses.map((e) => (
                                    <tr key={e._id}>
                                        <td>{e.question}</td>
                                        <td className={e.isCorrect ? "text-success" : "text-danger"}>
                                            {e.isCorrect ? "Correct" : "Incorrect"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="2" className="text-center">No responses found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default QuizHistory;
