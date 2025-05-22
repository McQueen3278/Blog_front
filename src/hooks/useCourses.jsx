import { useState, useEffect } from 'react';
import { getCourses } from '../services/Api';

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const result = await getCourses();
        console.log("Resultado en useCourses:", result);

        if (!result.success) {
          setError(result.message || "Error desconocido");
          setCourses([]);
        } else if (!result.courses || result.courses.length === 0) {
          setError(null);
          setCourses([]);
        } else {
          setError(null);
          setCourses(result.courses);
        }
      } catch (err) {
        console.error("Error al obtener los cursos:", err);
        setError("Ocurrió un error al intentar obtener los cursos.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
};

export default useCourses;
