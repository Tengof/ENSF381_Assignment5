import { useState, useEffect } from "react";
import EnrolledCourse from "./EnrolledCourse";

function EnrollmentList() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    function loadEnrolledCourses() {
        const stored = localStorage.getItem("enrolledCourses");
        if (stored != null) {
            setEnrolledCourses(JSON.parse(stored));
        } else {
            setEnrolledCourses([]);
        }
    }

    useEffect(() => {
        loadEnrolledCourses();
        window.addEventListener("enrollmentUpdated", loadEnrolledCourses);
        return () => {
        window.removeEventListener("enrollmentUpdated", loadEnrolledCourses);
        };
    }, []);

    const totalCredits = enrolledCourses.length;

    function dropCourse(courseId) {
        const updatedCourses = enrolledCourses.filter(course => course.id != courseId);
        localStorage.setItem("enrolledCourses", JSON.stringify(updatedCourses));
        setEnrolledCourses(updatedCourses);
    }

    return (
        <div>
            <h1>Enrolled Courses</h1>
            <p>Total credit hours: {totalCredits}</p>
            <div className="catalog">
                {enrolledCourses.map(course => (
                    <EnrolledCourse key={course.id} course={course} onDrop={dropCourse} />
            ))}
            </div>
        </div>
    );
}

export default EnrollmentList;
