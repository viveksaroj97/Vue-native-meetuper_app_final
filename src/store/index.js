import Vuex from 'vuex'
import Vue from 'vue-native-core'
import axios from 'axios'

import meetups from './modules/meetups'
import threads from './modules/threads'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        meetups,
        threads
    },
    //Like data in component, we keep it in state
    state: {
        
    },
    //computed properties in a component
    // You can use getters to access states in the store
    getters: {

    },
    // Like methods in components
    // To perform actions that usually result in data
    actions: {
        // 2. We are getting here from dispatch of action in HomeScreen
 
    },
    // Like methods in components
    // To save data to the state
    mutations: {
        setItems (state, {items, resource}) {
            Vue.set(state[resource],'items', items)
        }
    }
})

