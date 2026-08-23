import api from "../API/axios";

export const register = async (user_data) => {
    const response = await api.post("/auth/register",user_data); 
    return response.data;
}

export const login = async (user_data)=> {
    const response = await api.post("/auth/login", user_data)
    return response.data;
}