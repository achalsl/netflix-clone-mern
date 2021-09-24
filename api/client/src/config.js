import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'https://netflix-achal.herokuapp.com/api/'
})