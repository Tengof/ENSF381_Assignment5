import { useState } from "react";

function CourseItem({ course }) {
    const [hover, setHover] = useState(false);

    function enrollCourse(course) {
        let enrolledCourses = [];
        const stored = localStorage.getItem("enrolledCourses");

        if (stored !== null) {
            enrolledCourses = JSON.parse(stored);
        }

        const alreadyEnrolled = enrolledCourses.find(cour => cour.id == course.id);
        
        if (!alreadyEnrolled) {
            enrolledCourses.push(course);
            localStorage.setItem("enrolledCourses", JSON.stringify(enrolledCourses));
            window.dispatchEvent(new Event("enrollmentUpdated"));
        }
    }

    return (
        <div className="courseCard" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <img src={course.image} alt={course.name} />
        <div>
            {course.name}
        </div>
        <div>
            Instructor: {course.instructor}
        </div>
        <br></br>
        {hover && (<div>{course.description}</div>)}
        <button onClick={() => enrollCourse(course)}>Enroll Now</button>
        <br></br>
        </div>
    );
}

export default CourseItem;
