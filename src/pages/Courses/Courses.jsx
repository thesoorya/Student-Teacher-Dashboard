import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Row, Col } from 'react-bootstrap';
import './Courses.css';
import StudentNavbar from '../../component/StudentNavbar/StudentNavbar';

const CourseGrid = () => {
    const courses = [
        {
            id: 1,
            image: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
            title: "Web Development Bootcamp",
            price: "$199",
            link: "https://www.example.com/web-development"
        },
        {
            id: 2,
            image: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Data Science A-Z",
            price: "$299",
            link: "https://www.example.com/data-science"
        },
        {
            id: 3,
            image: "https://images.pexels.com/photos/1601773/pexels-photo-1601773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
            title: "Graphic Design Masterclass",
            price: "$159",
            link: "https://www.example.com/graphic-design"
        },
        {
            id: 4,
            image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Digital Marketing Essentials",
            price: "$199",
            link: "https://www.example.com/digital-marketing"
        },
        {
            id: 5,
            image: "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Python for Everybody",
            price: "$249",
            link: "https://www.example.com/python"
        },
        {
            id: 6,
            image: "https://images.pexels.com/photos/529598/pexels-photo-529598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            title: "Machine Learning A-Z",
            price: "$399",
            link: "https://www.example.com/machine-learning"
        }
    ];

    return (
        <>
            <StudentNavbar />
            <div className="container mt-4">
                <Row>
                    {courses.map(course => (
                        <Col key={course.id} sm="6" md="4" lg="3">
                            <Card className="mb-4">
                                <div className="course-img-container">
                                    <CardImg className='course-img' top src={course.image} alt={course.title} />
                                </div>
                                <CardBody>
                                    <CardTitle tag="h5">{course.title}</CardTitle>
                                    <CardText>{course.price}</CardText>
                                    <Button variant="primary" href={course.link}>
                                        Learn More
                                    </Button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </>
    );
};

export default CourseGrid;
