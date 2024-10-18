import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import DonutChart from './DonutChart';

const TeacherDashboard = () => {
    const [userName, setUserName] = useState('');
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [batch, setBatch] = useState('');
    const [attendance, setAttendance] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.role === 'teacher') {
            setUserName(storedUser.name);
        } else {
            navigate('/login');
        }

        const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
        setStudents(storedStudents);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('loggedInRole');
        navigate('/login');
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !phone || !rollNumber || !batch || !attendance) {
            toast.error('Please fill in all fields.');
            return;
        }

        const isRollNumberUnique = !students.some(student => student.rollNumber === rollNumber);
        const isPhoneNumberUnique = !students.some(student => student.phone === phone);

        if (!isRollNumberUnique) {
            toast.error('Roll Number must be unique.');
            return;
        }

        if (!isPhoneNumberUnique) {
            toast.error('Phone Number must be unique.');
            return;
        }

        const newStudent = {
            name,
            phone,
            rollNumber,
            batch,
            attendance,
        };

        const updatedStudents = [...students, newStudent];
        setStudents(updatedStudents);
        localStorage.setItem('students', JSON.stringify(updatedStudents));

        setName('');
        setPhone('');
        setRollNumber('');
        setBatch('');
        setAttendance('');

        toast.success('Student attendance recorded successfully!');
    };

    const updateAttendance = (rollNumber, newStatus) => {
        const updatedStudents = students.map(student =>
            student.rollNumber === rollNumber ? { ...student, attendance: newStatus } : student
        );

        setStudents(updatedStudents);
        localStorage.setItem('students', JSON.stringify(updatedStudents));

        toast.success(`Attendance updated to ${newStatus} for Roll Number: ${rollNumber}`);
    };

    const presentCount = students.filter(student => student.attendance === 'present').length;
    const absentCount = students.filter(student => student.attendance === 'absent').length;

    return (
        <Container>
            <Row className="my-4">
                <Col className='d-flex justify-content-between'>
                    <h3>Teacher Dashboard</h3>
                    <Button variant="dark" className="float-right" onClick={handleLogout}>Logout</Button>
                </Col>
            </Row>

            <Row>
                <Col className="text-center">
                    <h1>Hello, {userName}!</h1>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={6}>
                    <h2 className="text-center">Student Attendance Form</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter student name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="phone" className="mb-3">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="rollNumber" className="mb-3">
                            <Form.Label>Roll Number</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter roll number"
                                value={rollNumber}
                                onChange={(e) => setRollNumber(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="batch" className="mb-3">
                            <Form.Label>Batch</Form.Label>
                            <Form.Select
                                value={batch}
                                onChange={(e) => setBatch(e.target.value)}
                                required
                            >
                                <option value="">Select batch</option>
                                <option value="batch-1">Batch-1</option>
                                <option value="batch-2">Batch-2</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="attendance" className="mb-3">
                            <Form.Label>Attendance</Form.Label>
                            <Form.Select
                                value={attendance}
                                onChange={(e) => setAttendance(e.target.value)}
                                required
                            >
                                <option value="">Select attendance</option>
                                <option value="present">Present</option>
                                <option value="absent">Absent</option>
                            </Form.Select>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">Submit</Button>
                    </Form>
                </Col>

                <Col md={6} className="mt-4 mt-md-0">
                    <h2 className="text-center">Student List</h2>
                    <ListGroup>
                        {students.map((student) => (
                            <ListGroup.Item key={student.rollNumber} className="d-flex flex-md-column justify-content-between align-items-center align-items-md-start " id='list-items'>
                                <div><span>{student.name} - {student.rollNumber} - {student.attendance}</span></div>
                                <div className="mt-2 mt-md-0">
                                    <Button
                                        variant="success"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => updateAttendance(student.rollNumber, 'present')}
                                    >
                                        Present
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => updateAttendance(student.rollNumber, 'absent')}
                                    >
                                        Absent
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

            </Row>

            <Row className="my-5">
                <Col md={12}>
                    <h2 className="text-center">Attendance Summary</h2>
                    <DonutChart presentCount={presentCount} absentCount={absentCount} />
                </Col>
            </Row>
        </Container>
    );
};

export default TeacherDashboard;
