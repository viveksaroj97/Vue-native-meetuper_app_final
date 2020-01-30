import Vue from 'vue-native-core'
import axiosInstance from '@/services/axios'
import { Platform } from 'react-native'
import { AsyncStorage } from 'react-native'
import jwtDecode from 'jwt-decode'

// const BASE_URL = Platform.OS === 'ios' ? 'http://localhost:3001/api/v1'
//                                        : 'http://10.0.2.2:3001/api/v1'


const isTokenValid = (token) => {
    if (token) {
        const decodedToken = jwtDecode(token)
        return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()

    }
    return false

}


export default {
    namespaced: true,

    state: {
        user: null,
        isAuthResolved: false,

    },
    getters: {
        isAuth (state) {
            return !!state.user

        }
    },
    actions: {
        login({ commit, state }, userData) {
            return axiosInstance.post(`/users/login`, userData)
            // return axios.post(`${BASE_URL}/users/login`, userData)
                .then(res => {
                    const user = res.data
                    AsyncStorage.setItem('meetuper-jwt', user.token)
                    commit('setAuthUser', user)
                    return state.user
                })
        },

        register (context, userData) {
            return axiosInstance.post(`/users/register`, userData)
            // return axios.post(`${BASE_URL}/users/register`, userData)

        },

        logout ({commit}) {
            return new Promise((resolve) => {
                AsyncStorage.removeItem('meetuper-jwt')
                commit('setAuthUser', null)
                resolve()
            })

        },

        fetchCurrentUser ({commit, state}) {
            return axiosInstance.get(`/users/me`)
              .then(res => {
                  const user = res.data
                  AsyncStorage.setItem('meetuper-jwt', user.token)
                  commit('setAuthUser', user)
                  return state.user

              })
              .catch(() => undefined)
        },

        async verifyUser({dispatch, commit}) {
            // The jwt has all the login data of a user such as:
            // token, name, etc... from which we are getting the token 
            //
            const jwt = await AsyncStorage.getItem('meetuper-jwt')

            // Promise resolve or rejects the async operations and handle it
            if (jwt && isTokenValid(jwt)) {
                const user = await dispatch('fetchCurrentUser')
                // Setting resolveAuth to true, when authenticated
                commit('resolveAuth')

                return user ? Promise.resolve(jwt) 
                            : Promise.reject('Token is not valid')

                return Promise.resolve(jwt)
            } else {
                // Setting resolveAuth to true, even when not authenticated
                // -because we want to display something
                commit('resolveAuth')
                return Promise.reject('Token is not valid')
            }
        }
    },
    mutations: {
        setAuthUser(state, user) {
            return state.user = user
        },
        resolveAuth (state) {
            state.isAuthResolved = true
        }
    }

}