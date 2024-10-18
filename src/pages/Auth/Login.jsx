import React, { useState } from 'react';
import './Auth.css';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            (user) => user.email === email && user.password === password
        );

        if (user && user.role === role) {
            localStorage.setItem('loggedInRole', role);
            localStorage.setItem('user', JSON.stringify(user));
            
            if (role === 'student') {
                navigate('/student-dashboard');
            } else {
                navigate('/teacher-dashboard');
            }
        } else {
            toast.error('Invalid credentials. Please try again.');
        }
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
            <form className="form" onSubmit={handleLogin}>
                <p className="form-title">Sign in to your {role} account</p>
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
                <button className="submit" type="submit">Sign in</button>
                <p className="signup-link">
                    No account? <Link to="/signup">Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
