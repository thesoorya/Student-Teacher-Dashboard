import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import StudentNavbar from '../StudentNavbar/StudentNavbar'

const timetableData = {
    Monday: [
        { time: "9:00 AM - 10:00 AM", course: "Web Development" },
        { time: "10:00 AM - 11:00 AM", course: "Data Science" },
        { time: "11:00 AM - 12:00 PM", course: "Break" },
        { time: "12:00 PM - 1:00 PM", course: "Cloud Computing" },
        { time: "1:00 PM - 2:00 PM", course: "Cybersecurity" },
    ],
    Tuesday: [
        { time: "9:00 AM - 10:00 AM", course: "Machine Learning" },
        { time: "10:00 AM - 11:00 AM", course: "Artificial Intelligence" },
        { time: "11:00 AM - 12:00 PM", course: "Break" },
        { time: "12:00 PM - 1:00 PM", course: "DevOps" },
        { time: "1:00 PM - 2:00 PM", course: "Mobile App Development" },
    ],
    Wednesday: [
        { time: "9:00 AM - 10:00 AM", course: "Blockchain Technology" },
        { time: "10:00 AM - 11:00 AM", course: "Data Science" },
        { time: "11:00 AM - 12:00 PM", course: "Break" },
        { time: "12:00 PM - 1:00 PM", course: "Cybersecurity" },
        { time: "1:00 PM - 2:00 PM", course: "Internet of Things (IoT)" },
    ],
    Thursday: [
        { time: "9:00 AM - 10:00 AM", course: "Artificial Intelligence" },
        { time: "10:00 AM - 11:00 AM", course: "Cloud Computing" },
        { time: "11:00 AM - 12:00 PM", course: "Break" },
        { time: "12:00 PM - 1:00 PM", course: "Web Development" },
        { time: "1:00 PM - 2:00 PM", course: "DevOps" },
    ],
    Friday: [
        { time: "9:00 AM - 10:00 AM", course: "Mobile App Development" },
        { time: "10:00 AM - 11:00 AM", course: "Blockchain Technology" },
        { time: "11:00 AM - 12:00 PM", course: "Break" },
        { time: "12:00 PM - 1:00 PM", course: "Machine Learning" },
        { time: "1:00 PM - 2:00 PM", course: "Internet of Things (IoT)" },
    ],
    Saturday: [
        { time: "9:00 AM - 10:00 AM", course: "Cloud Computing" },
        { time: "10:00 AM - 11:00 AM", course: "Data Science" },
        { time: "11:00 AM - 12:00 PM", course: "Break" },
        { time: "12:00 PM - 1:00 PM", course: "Cybersecurity" },
        { time: "1:00 PM - 2:00 PM", course: "Web Development" },
    ],
    Sunday: [],
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Timetable = () => {
    const [currentDayIndex, setCurrentDayIndex] = useState(0);

    const handleNextDay = () => {
        setCurrentDayIndex((prevIndex) => (prevIndex + 1) % days.length);
    };

    const handlePrevDay = () => {
        setCurrentDayIndex((prevIndex) => (prevIndex === 0 ? days.length - 1 : prevIndex - 1));
    };

    const currentDay = days[currentDayIndex];
    const timetableForCurrentDay = timetableData[currentDay];

    return (
        <>
            <StudentNavbar />
            <div className="container py-2 mt-4">
                <h2 className="text-center">{currentDay}</h2>

                {timetableForCurrentDay.length > 0 ? (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Course</th>
                            </tr>
                        </thead>
                        <tbody>
                            {timetableForCurrentDay.map((session, index) => (
                                <tr key={index}>
                                    <td>{session.time}</td>
                                    <td>{session.course}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <p className="text-center">No classes scheduled, it's a day off!</p>
                )}

                <div className="d-flex justify-content-between mt-3">
                    <Button variant="primary" onClick={handlePrevDay}>
                        Previous
                    </Button>
                    <Button variant="primary" onClick={handleNextDay}>
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
};

export default Timetable;
