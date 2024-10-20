import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentNavbar from '../../component/StudentNavbar/StudentNavbar';
import './StudentDashboard.css';

const studentData = {
    courses: [
        { id: 1, name: "Math 101", status: "Enrolled" },
        { id: 2, name: "Biology 201", status: "Enrolled" },
        { id: 3, name: "History 301", status: "Completed" },
    ],
    announcements: [
        { id: 1, title: "Project Submission", content: "Your Math project is due on Friday." },
        { id: 2, title: "Holiday Notice", content: "School will be closed on Monday for the holiday." },
        { id: 3, title: "New Course Available", content: "A new course on Advanced Biology has been added to the curriculum." },
    ],
};

const StudentDashboard = () => {
    const [userName, setUserName] = useState('');
    const [mentor, setMentor] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedUser && storedUser.role === 'student') {
            setUserName(storedUser.name);
        } else {
            navigate('/login');
        }

        const mentors = JSON.parse(localStorage.getItem('users'));
        if (mentors) {
            const teachers = mentors.filter((item) => item.role === 'teacher');
            setMentor(teachers);
        }
    }, [navigate]);

    return (
        <div>
            <StudentNavbar />
            <div className='student'>
                <h1 className='text-center'>Hello, {userName}!</h1>
                <div className="student-dashboard">
                    <div className="courses">
                        <h2>My Courses</h2>
                        <ul>
                            {studentData.courses.map(course => (
                                <li key={course.id}>
                                    {course.name} - {course.status}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="announcements">
                        <h2>Announcements</h2>
                        {studentData.announcements.map(announcement => (
                            <div key={announcement.id} className="announcement">
                                <h3>{announcement.title}</h3>
                                <p>{announcement.content}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mentors">
                    <h2>Mentors</h2>
                    <ul>
                        {mentor.map((teacher) => (
                            <li key={teacher.email}>
                                {teacher.name.toUpperCase()}, E-Mail: {teacher.email}
                            </li>
                        ))}
                    </ul>
                </div>
                {/*  */}
            </div>
        </div>
    );
};

export default StudentDashboard;
