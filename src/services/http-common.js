import axios from 'axios'

export default axios.create({
  baseURL: 'http://13.209.43.95:9999/hjs',
  headers: {
    'Content-type': 'application/json'
  }
})
