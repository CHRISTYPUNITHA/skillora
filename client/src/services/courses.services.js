import api from "../utils/api";


export const getAllCourses = async () => {
    try {
        const res = await api.get('/courses');
        return res.data;
    } catch (error) {
        console.error("Error fetching courses:", error);
        throw error;
    }
}

export const getCourseById = async (id) => {
    try {
        const res = await api.get(`/courses/${id}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching course:", error);
        throw error;
    }
}