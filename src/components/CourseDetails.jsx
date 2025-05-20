import { useState, useEffect } from "react";
import { getCourseById } from "../services/Api";

const useCourseDetails = (id) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const result = await getCourseById(id);

        if (!result.success) {
          setError("Curso no encontrado.");
        } else {
          setCourse(result.course); // Asegúrate de que `result.course` exista
        }
      } catch (e) {
        console.error("Error al obtener el curso:", e);
        setError("Error al obtener el curso.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id]);

  return { course, loading, error };
};

export default useCourseDetails;
  