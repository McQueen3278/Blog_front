import React from "react";

export const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <h3>{course.name}</h3>
      <p>{course.description}</p> 
    </div>
  );
};
