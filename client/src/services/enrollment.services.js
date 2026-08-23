import api from "../utils/api";

export const getMyLearningCourses = async () => {
    try {
        const res = await api.get('/enrollments/my-learning');
        return res.data;
    } catch (error) {
        console.error("Error fetching my learning courses:", error);
        throw error;
    }
}

export const getLearnCourse = async (slug) => {
    try {
        const res = await api.get(`/enrollments/learn/${slug}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching learn course:", error);
        throw error;
    }
}


