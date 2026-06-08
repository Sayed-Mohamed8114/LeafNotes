import axios from 'axios'; 

import BASE_URL from './constants.js';

const axiosInstance = axios.create({
    baseURL:BASE_URL ,
    timeout:1000, 
    headers:{
        "Content-Type":"application/json",
    }
})

axiosInstance.interceptors.request.use(
    (config)=>{
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config; 
    },
    (error) => {
        return Promise.reject(error);
    }
);

// the job of the export is to use the axiosInstance in other files
export default axiosInstance ; 