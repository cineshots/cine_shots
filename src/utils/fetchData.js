import axios from 'axios';

export const fetchDataFromApi = async (url, body) => {
    try {
        const config = {
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
            data: body,
            timeout: 10000, // 10 seconds timeout (adjust as needed)
            withCredentials: true, // Include credentials (cookies) in the request
        };

        const response = await axios(config);
        const data = response.data;
        return data
    } catch (error) {
        if (error?.response?.status === 400 || error?.response?.status === 404 ||  error?.response?.status === 500) {
           return error?.response?.data;
        } 
        if (error?.response?.status === 429) {
            return { error: 'Too many requests, please wait' };
        }
     
        if (error.response.status === 401) {
            localStorage.clear();
            window.location.replace('/login');
            return null
        } 
        return { error: 'Something went wrong' };
    }
};


import moment from 'moment-timezone';

export const getFormatedTimeFromSeconds = (time, format) => {
    moment.tz.setDefault('UTC');
    const dateInAsiaKolkata = moment.unix(time).tz('Asia/Kolkata');
    return dateInAsiaKolkata.format(format)
}

export const getFormatedTime = (time, format) =>{
    const localDate = moment.utc(time).local();
    const formattedDate = localDate.format(format);
    return formattedDate;
}



import jwt from "jsonwebtoken";

export const getDataFromToken = (request) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        console.log( process.env.TOKEN_SECRET)
        const decodedToken =  jwt.verify(token, process.env.TOKEN_SECRET);
        return decodedToken;
    } catch (error) {
        console.log(error)
        throw new Error(error.message);
    }

}