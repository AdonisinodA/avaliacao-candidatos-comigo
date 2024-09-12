import localStorageService from '@/service/localStorage';
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001', 
});

api.interceptors.request.use((config) => {
	const token = localStorageService.getUser()?.token;
	if (token) {
		config.headers.Authorization = token;
	}
	return config;
});


  


export default api;
