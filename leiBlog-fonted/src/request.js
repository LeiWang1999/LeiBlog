import axios from 'axios'

// const BASE_URL = "http://localhost:8088/api"
const BASE_URL = "http://49.235.205.19:8088/api"
const request = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
})

export default request
