import React from "react";
import { useParams } from "react-router-dom";
import useCourseDetails from "../hooks/useCourseDetails";

const CourseDetails = () => {
  const { id } = useParams();
  const { course, loading, error } = useCourseDetails(id);

  if (loading) return <p>Cargando detalles del curso...</p>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      {course && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">{course.name}</h1>
          <p className="text-lg font-semibold mb-2">Profesor: {course.professor}</p>
          {course.courseImage && (
            <img
              src={`http://localhost:3000/uploads/course-images/${course.courseImage}`}
              alt={course.name}
              className="w-full max-w-md h-auto rounded"
            />
          )}

        </div>
      )}
    </div>
  );
};

export default CourseDetails;
