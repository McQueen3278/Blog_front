import React from 'react';

export const CourseCard = ({ course }) => {
  return (
    <div className="w-40 bg-white rounded-lg shadow-md p-3 transform transition-transform hover:scale-105 hover:shadow-lg">
      <img
        src={`http://localhost:3000/uploads/course-images/${course.courseImage}`}
        alt={course.name}
        className="w-full h-[96px] object-cover rounded mb-2"
      />
      <h2 className="text-md font-semibold text-gray-800 text-center mb-1">{course.name}</h2>
      <p className="text-sm text-gray-600 text-center">{course.professor}</p>
    </div>
  );
};

const CourseList = ({ courses }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {courses.map(course => (
        <CourseCard key={course._id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
