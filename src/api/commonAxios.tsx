import axios from 'axios'

const commonAxios = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https:sadhan.com.np'
      : process.env.REACT_APP_BASE_URL,

  timeout: 10000,

  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

export default commonAxios
