import React, { useState } from 'react';
import course1 from '../images/course1.jpg';

const CourseItem = ({ course, onEnroll }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div style={{
      backgroundColor: '#e6f2ff',
      borderRadius: '10px',
      padding: '15px',
      transition: 'transform 0.2s',
    }}>
      <img
        src={course.image}
        alt={course.name}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px'
        }}
      />
      <h3
        style={{ 
          margin: '15px 0',
          color: '#004080',
          cursor: 'pointer'
        }}
        onMouseEnter={() => setShowDescription(true)}
        onMouseLeave={() => setShowDescription(false)}
      >
        {course.name}
      </h3>
      
      {showDescription && (
        <p style={{ color: '#666', marginBottom: '15px' }}>
          {course.description}
        </p>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span style={{ color: '#003366' }}>{course.instructor}</span>
        <span style={{ fontWeight: 'bold' }}>{course.duration}</span>
      </div>

      <button
        onClick={() => onEnroll(course)}
        style={{
          width: '100%',
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Enroll Now
      </button>
    </div>
  );
};

export default CourseItem;
