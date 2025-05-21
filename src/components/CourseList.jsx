import React from 'react';
import { Link } from 'react-router-dom';

export const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img
        src={`http://localhost:3000/uploads/course-images/${course.courseImage}`}
        alt={course.name}
        className="course-image"
      />
      <h2 className="course-name">{course.name}</h2>
      <p className="course-professor">{course.professor}</p>
        <Link to={`/course/${course._id}`} className="btn-gradient">
          Ver curso
        </Link>
    </div>
  );
};

const CourseList = ({ courses }) => {
  return (
    <div className="course-list-container">
      <div className="course-list">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
