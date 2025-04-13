import React from 'react';

const EnrolledCourse = ({ course, onRemove }) => {
    return (
        <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '15px'
        }}>
        <h4 style={{ margin: '0 0 10px', color: '#003366' }}>{course.name}</h4>
        <p style={{ margin: '5px 0', fontSize: '0.9em' }}>
            Instructor: {course.instructor}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9em' }}>{course.duration}</span>
            <button
            onClick={() => onRemove(course.enrollmentId)}
            style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
            }}
            >
            Drop
            </button>
        </div>
        </div>
    );
    };

export default EnrolledCourse;
