import React, { useEffect, useState } from "react";
import { getCourses } from "../services/Api";
import { Link } from "react-router-dom";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const result = await getCourses();

        if (!result || !Array.isArray(result)) {
          setError("Error al obtener los cursos.");
        } else {
          setCourses(result);
        }
      } catch (err) {
        setError("Ocurrió un error inesperado.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="Cursos">
      <div className="container mx-auto px-4">
      <h1 className="font-bold text-2xl mb-4 text-center">Lista de Cursos</h1>

      {loading && <p className="text-center">Cargando...</p>}
      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && courses.length === 0 && (
        <p className="text-center">No se encontraron cursos.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {courses.map((course) => (
          <Link
            to={`/courses/${course._id}`}
            key={course._id}
            className="course-card p-4 border rounded-lg shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">{course.name}</h3>
            <p className="text-sm text-gray-600">{course.professor}</p>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Home;
