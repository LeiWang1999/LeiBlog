import axios from 'axios'

const BASE_URL = "http://localhost:8088/api"
const request = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export default request