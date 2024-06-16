import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseUrl } from '../api';
import moment from 'moment';
import { Link } from 'react-router-dom';

const UserResponse = () => {
    const [loading, setLoading] = useState(true);
    const [responses, setResponses] = useState([]);

    const getResponses = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/api/score/all`);
            setResponses(data);
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
                                <th>Name</th>
                                <th>Score</th>
                                <th>date</th>
                                <th>View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {responses.length > 0 ? (
                                responses.map((e) => (
                                    <tr key={e._id}>
                                        <td>{e.name}</td>
                                        <td>{e.score}</td>
                                        <td>{moment(e.createdAt).format('LLL')}</td>
                                        <td>
                                            <Link to={`/responses/${e._id}`} className="btn btn-info">View</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center">No responses found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default UserResponse;
