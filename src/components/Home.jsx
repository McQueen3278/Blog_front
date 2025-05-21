import React from 'react';
import useCourses from '../hooks/useCourses';
import CourseList from './CourseList'; 

const Home = () => {
  const { courses, loading, error } = useCourses();



  if (loading) return <p className="text-center mt-10 text-lg">Cargando cursos...</p>;
  if (error) return <p className="text-center mt-10 text-lg text-red-600">Error: {error}</p>;
  if (courses.length === 0) return <p className="text-center mt-10 text-lg">No se encontraron cursos.</p>;

  return (
    <>
    <center><h1 className='Bienvenida'>Blog de Aprendizaje</h1></center>
      <div className="min-h-screen bg-gray-100 py-10 px-4">
      <CourseList courses={courses} />
    </div>
 
    </>
  );
};

export default Home;
