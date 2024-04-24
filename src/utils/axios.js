import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api'
const JWT_KEY = 'jwtToken'

export const jwt = {
    get() {
        const token = localStorage.getItem(JWT_KEY)
        return token
    },
    set(val) {
        val
            ? localStorage.setItem(JWT_KEY, val)
            : localStorage.removeItem(JWT_KEY)
    },
}

const instance = axios.create({
    baseURL: BASE_URL,
})

instance.interceptors.request.use(config => {
    config.headers.Authorization = 'Bearer ' + jwt.get()
    return config
})

export default instance
