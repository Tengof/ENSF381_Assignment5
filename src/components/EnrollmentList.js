import React, { useEffect } from 'react';
import EnrolledCourse from './EnrolledCourse';

const EnrollmentList = ({ enrolledCourses = [], onRemove }) => {
  const totalCredits = enrolledCourses.reduce((sum, course) => {
    const weeks = parseInt(course.duration.match(/\d+/)?.[0] || 0, 10);
    return sum + weeks;
  }, 0);

  useEffect(() => {
    localStorage.setItem('enrollments', JSON.stringify(enrolledCourses));
  }, [enrolledCourses]);

  return (
    <div style={{
      flex: 1,
      maxWidth: '350px',
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#004080', marginBottom: '20px' }}>My Enrollments</h2>
      
      {enrolledCourses.length === 0 ? (
        <p style={{ color: '#666', textAlign: 'center' }}>No courses enrolled yet</p>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            {enrolledCourses.map(course => (
              <EnrolledCourse key={course.enrollmentId} course={course} onRemove={onRemove} />
            ))}
          </div>
          
          <div style={{ borderTop: '2px solid #004080', paddingTop: '15px' }}>
            <h3 style={{ color: '#004080' }}>Total Study Load: {totalCredits} weeks</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default EnrollmentList;
