import React, { useState } from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find((user) => user.email === email);
        if (userExists) {
            toast.error("Email already exists. Please login.");
            return;
        }

        users.push({ name, email, password, role });

        localStorage.setItem("users", JSON.stringify(users));

        localStorage.setItem("user", JSON.stringify({ name, email, password, role }));

        navigate('/login');
    };

    return (
        <div className='auth-container'>
            <div className='tabs'>
                <button
                    className={`tab ${role === 'student' ? 'active' : ''}`}
                    onClick={() => setRole('student')}
                >
                    Student
                </button>
                <button
                    className={`tab ${role === 'teacher' ? 'active' : ''}`}
                    onClick={() => setRole('teacher')}
                >
                    Teacher
                </button>
            </div>
            <form className="form" onSubmit={handleSignup}>
                <p className="form-title">Create your {role} account</p>
                <div className="input-container">
                    <input
                        placeholder="Enter name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        placeholder="Enter email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <input
                        placeholder="Enter password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="submit" type="submit">Sign up</button>
                <p className="signup-link">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
