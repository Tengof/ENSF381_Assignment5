function EnrolledCourse({ course, onDrop }) {
    return (
        <div className='courseCard' id={`enrolled${course.id}`}>
            <img src={course.image} alt={course.name}/>
            <div>
                {course.name}
            </div>
            <div>
                Instructor: {course.instructor}
            </div>
            <div>Credit Hours: 1</div>
            <button onClick={() => onDrop(course.id)}>Drop Course</button>
            <br/><br/>
        </div>
    );
}

export default EnrolledCourse;
