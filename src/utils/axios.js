import axios from 'axios'

const BASE_URL = 'http://localhost:8080/api/'

const getJWT = () => {
    const token = localStorage.getItem('jwtToken')
    return 'Bearer ' + token
}

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: getJWT(),
    },
})

export default instance
