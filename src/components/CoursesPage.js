import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CourseItem from './CourseItem';
import EnrollmentList from './EnrollmentList';

const CoursesPage = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(() => {
    const saved = localStorage.getItem('enrollments');
    return saved ? JSON.parse(saved) : [];
  });

  const [courses, setCourses] = useState([])
  
  useEffect(() => {
    fetch('http://127.0.0.1:5000/courses')
    .then((response) => response.json())
    .then((data) => setCourses(data))
    .catch((error) => console.error('Failed to fetch course list:', error));
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/student_courses/1`)
    .then((response) => response.json())
    .then((data) => setEnrolledCourses(data))
    .catch((error) => console.error('Failed to fetch enrolled courses:', error));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('enrollments', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  const handleEnroll = (course) => {
    fetch(`http://127.0.0.1:5000/enroll/1`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'course':course.id})
    })
    .then(response => response.json())
    .then(() => setEnrolledCourses(prev => [...prev, { 
      ...course,
      enrollmentId: Date.now() // Unique ID for each enrollment
    }]))
    .catch(error => console.error('Error enrolling:', error));
  };

  const handleRemove = (enrollmentId) => {
    const enrollments = JSON.parse(localStorage.getItem('enrollments'));
    var course_to_drop = null;
    for (let course of enrollments) {
      if (course['enrollmentId'] == enrollmentId) {
        course_to_drop = course;
      }
    }

    fetch(`http://127.0.0.1:5000/drop/1`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'course':course_to_drop['id']})
    })
    .then(() => setEnrolledCourses(prev => 
      prev.filter(course => course.enrollmentId !== enrollmentId)
    ))
    .catch(error => console.error('Error dropping:', error));
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      
      <div style={{ 
        flex: 1,
        display: 'flex',
        padding: '20px',
        gap: '30px'
      }}>
        <div style={{ flex: 3 }}>
          <h2 style={{ color: '#004080' }}>Available Courses</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {courses.map(course => (
              <CourseItem 
                key={course.id} 
                course={course} 
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </div>
        
        <EnrollmentList 
          enrolledCourses={enrolledCourses}
          onRemove={handleRemove}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;
