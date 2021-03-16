import axios from 'axios'

let headers = {

};

if (localStorage.getItem('access_token')) {
    headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
}

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
    headers,
})

export default axiosInstance;