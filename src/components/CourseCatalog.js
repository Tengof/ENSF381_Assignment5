import React from 'react';
import CourseItem from './CourseItem';
import courses from '../data/courses';

const CourseCatalog = ({ onEnroll }) => {
    return (
        <div>
        <h2 style={{ color: '#004080' }}>Available Courses</h2>
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
        }}>
            {courses.map(course => (
            <CourseItem key={course.id} course={course} onEnroll={onEnroll} />
            ))}
        </div>
        </div>
    );
    };

    export default CourseCatalog;
