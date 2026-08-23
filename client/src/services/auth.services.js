import api from "../utils/api";


export const signup = async (data) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
};

export const login = async (data) => {
    try{
        const response = await api.post("/auth/login", data);
        return response.data;
    }catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

export const me = async () => {
    try{
        const response = await api.get("/auth/me");
        return response.data;
    }
    catch (error) {
        if (error.response && error.response.status !== 401) {
            console.error("Error fetching user:", error);
        }
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await api.post("/auth/logout");
        return response.data;
    } catch (error) {
        console.error("Error during logout:", error);
        throw error;
    }
}