import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        
        if (storedUser && storedUser.role === 'student') {
            setUserName(storedUser.name);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user'); 
        localStorage.removeItem('loggedInRole'); 
        navigate('/login');
    };

    return (
        <div>
            <h1>Welcome to the Student Dashboard</h1>
            <p>Hello, {userName}!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default StudentDashboard;
