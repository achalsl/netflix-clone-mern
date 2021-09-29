import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://netflix-achal.herokuapp.com/",
	// baseURL: 'http://localhost:8800/',
	// proxy: {
	//     host: 'localhost',
	//     port: 8800
	// }
});
