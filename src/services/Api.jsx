import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:3000/blog/v1",
  timeout: 5000,
});

export const getCourses = async () => {
  try {
    const response = await apiClient.get("/course/getCourses");
    console.log('Respuesta de la API:', response.data); 
    return {
      success: true,
      courses: response.data.courses
    };
  } catch (e) {
    console.error("Error al obtener los cursos:", e);
    return {
      success: false,
      courses: [],
      message: e.message
    };
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await apiClient.get(`/course/getCourse/${id}`);
    const data = response.data;

    if (!data.success) {
      return { success: false, message: data.message || "Curso no encontrado" };
    }

    return data;
  } catch (e) {
    console.error("Error al obtener el curso:", e);
    return { success: false, message: e.message || "Error desconocido" };
  }
};

export const addComment = async (comment) => {
  try {
    const response = await apiClient.post(
      `/comment/addComment`,
      comment
    );
    return response.data;
  } catch (err) {
    console.error("Error al agregar el comentario:", err);
    throw err;
  }
};


export const getPostWithComments = async (id) => {
  try {
    const response = await apiClient.get(`/post/getPostWithComments/${id}`);
    return response.data;
  } catch (e) {
    console.error("Error al obtener post con comentarios:", e);
    return { success: false, message: e.message || "Error desconocido" };
  }
};
