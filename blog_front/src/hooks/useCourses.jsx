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
         if (!result.success || result.courses.length === 0) {
           setError("No se encontraron cursos.");
         } else {
           setCourses(result.courses);
         }
       } catch (err) {
         setError("Error al obtener los cursos.");
       } finally {
         setLoading(false);
       }
     };
 
     fetchCourses();
   }, []);
}

export default useCourses;
