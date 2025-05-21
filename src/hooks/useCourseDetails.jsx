import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourseById } from "../services/Api";


 const useCourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const result = await getCourseById(id);
        if (!result.success) throw new Error("Error al obtener curso");
        setCourse(result.course);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  return { course, loading, error };
};

export default useCourseDetails;
