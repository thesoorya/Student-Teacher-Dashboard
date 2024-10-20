import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const CustomNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); 
    localStorage.removeItem('loggedInRole'); 
    navigate('/login');
};

  return (
    <Navbar className='px-2' bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Student Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mx-auto">
          <Nav.Link as={Link} to="/student-dashboard">Home</Nav.Link>
          <Nav.Link as={Link} to="/timetable">TimeTable</Nav.Link>
          <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
        </Nav>
        <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
