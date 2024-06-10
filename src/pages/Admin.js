import React, { useEffect, useState } from 'react';
import { baseUrl } from "../api"
import axios from 'axios';
import { Link } from 'react-router-dom';
const AdminPage = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllQuiz = () => {
        axios.get(`${baseUrl}/api/quiz/all`)
            .then(res => {
                setTodos(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.error('Error fetching quizzes:', err);
            });
    }

    const handleDeleteOne = (id) => {
        axios.delete(`${baseUrl}/api/quiz/delete/${id}`)
            .then(res => {
                fetchAllQuiz()
            })
            .catch(err => {
                console.error('Error fetching quizzes:', err);
            });
    };
    const handleDeleteAll = (id) => {
        axios.delete(`${baseUrl}/api/quiz/delete/${id}`)
            .then(res => {
                fetchAllQuiz()
            })
            .catch(err => {
                console.error('Error fetching quizzes:', err);
            });
    };

    const handleUpdate = (id, newText) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: newText };
            }
            return todo;
        }));
    };

    useEffect(() => {
        fetchAllQuiz()
    }, []);

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
        <div className="container mt-5">
            <div className='d-flex justify-content-between align-items-center'>
                <h1 className="text-center mb-4">Todo List</h1>
                <div className='d-flex gap-2'>
                    <Link to={'/'} className='btn btn-info'>Home</Link>
                    <button onClick={handleDeleteAll} className='btn btn-danger'>Delete All</button>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Todo</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo, index) => (
                            <tr key={todo._id}>
                                <td>{index + 1}</td>
                                <td>{todo.question}</td>
                                <td className="text-center">
                                    <div className="d-inline-flex">
                                        <button className="btn btn-primary me-2" onClick={() => handleUpdate(todo.id, prompt('Enter new todo'))}>Update</button>
                                        <button onClick={() => handleDeleteOne(todo._id)} className="btn btn-danger">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
