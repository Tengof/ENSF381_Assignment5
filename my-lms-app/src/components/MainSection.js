import { useState, useEffect } from 'react';
import courses from '../data/courses';
import testimonials from '../data/testimonials';
import './MainSection.css';

function compare(){
    return (0.5 - Math.random());
}

function getRandom(arr, count){
    arr.sort(compare)
    return arr.slice(0, count)
}

function MainSection() {
    const [featuredCourses, setFeaturedCourses] = useState([])
    const [displayTestimonials, setDisplayTestimonials] = useState([]);

    useEffect(function(){
        var randomCourses = getRandom(courses, 3);
        setFeaturedCourses(randomCourses);

        const randomTestimonials = getRandom(testimonials, 2);
        setDisplayTestimonials(randomTestimonials);
    }, []);

    return(
        <div className="mainSection">
            <div className="about">
                <h2>About LMS</h2>
                <p>
                    This Learning Management System lets you explore courses, enroll, and view student reviews.
                </p>
            </div>
            <div className="featuredCourses">
                <h2>Featured Courses</h2>
                <div className="courseList">
                    {featuredCourses.map(function(course){
                        return(
                            <div key={course.id} className="courseCard">
                                <img src={course.image} alt={course.name} />
                                <h3>{course.name}</h3>
                                <p>{course.instructor}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="testimonials">
                <h2>Student Testimonials</h2>
                {displayTestimonials.map(function (test, index) {
                    return (
                        <div key={index} className="testimonials">
                            <h4>{test.studentName}</h4>
                            <p>{test.review}</p>
                            <p>{'★'.repeat(test.rating) + '☆'.repeat(5 - test.rating)}</p>
                        </div>
                    );
                })}
            </div>

        </div>
    );
}

export default MainSection;