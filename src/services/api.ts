// api.js
import Axios, { AxiosRequestHeaders } from 'axios'
import { getToken } from './auth'

const api = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Content-Type': 'application/json;charset=UTF-8',
  },
})

api.interceptors.request.use(async config => {
  const token = getToken()
  if (token) {
    if (!config) {
      config = {
        headers: {} as AxiosRequestHeaders,
      }
    }
    if (!config.headers) {
      config.headers = {} as AxiosRequestHeaders
    }
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
export default api
