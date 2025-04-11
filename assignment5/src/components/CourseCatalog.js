import "./courseCatalog.css";
import CourseItem from "./CourseItem";
import courses from "../data/courses";

function CourseCatalog({ onEnroll }) {
    return (
        <div>
            <h1>Course Catalog</h1>
            <div className='catalog'>
                {courses.map(course => (
                    <CourseItem key={course.id} course={course} onEnroll={onEnroll} />
                ))}
            </div>
        </div>
    );
}

export default CourseCatalog;
