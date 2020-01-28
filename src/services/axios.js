import axios from 'axios'
import { AsyncStorage } from 'react-native'

// In axiosInstance of axios, 
// we can incorporate more features such as timeout axios.
const axiosInstance = axios.create({
    timeout: 3000
})


// Interceptors : interceptors are special functions which intercepts your requests 
// and in that we can pass some additional info to ur request

axiosInstance.interceptors.request.use(async function (config) {
    const token = await AsyncStorage.getItem('meetuper-jwt')

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function (err) {
    return Promise.reject(err)
})

export default axiosInstance