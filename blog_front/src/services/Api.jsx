import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:3000/blog/v1",
  timeout: 5000,
});

export const getCourses = async () => {
  try {
    const response = await apiClient.get("/course/getCourses");
    console.log('Respuesta de la API:', response.data); 
    return response.data.courses; 
  } catch (e) {
    console.error("Error al obtener los cursos:", e);
    return { error: true, message: e.message };
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await apiClient.get(`/course/getCourse/${id}`);
    return response.data;
  } catch (e) {
    console.error("Error al obtener el curso:", e);
    return { success: false, message: e.message };
  }
};


