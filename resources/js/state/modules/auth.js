import axios from "axios";
import router from "../../router";
export const state = {
  currentUser: getSavedState('auth.currentUser'),
}

export const mutations = {
  SET_CURRENT_USER(state, newValue) {
    state.currentUser = newValue
    saveState('auth.currentUser', newValue)
    setDefaultAuthHeaders(state)
  },
}

export const getters = {
  // Whether the user is currently logged in.
  loggedIn(state) {
    return !!state.currentUser
  },
}

export const actions = {
    // This is automatically run in `src/state/store.js` when the app
    // starts, along with any other actions named `init` in other modules.
    init({ state, dispatch }) {
        console.log("METHOD::init ~ auth.js");
        setDefaultAuthHeaders(state)
        dispatch('validate')
    },

    // Logs in the current user.
    logIn({ commit, dispatch, getters }, { email, password } = {}) {
        if (getters.loggedIn) return dispatch('validate')

        return axios
            .post('/api/auth/login', { email, password })
            .then((response) => {
                const user = response.data
                commit('SET_CURRENT_USER', user)
                return user
            })
    },

    // Logs out the current user.
    logOut({ commit }) {
        axios.post('/api/auth/logout')
            .then(resp => {
                console.log("Logout Response -> ", resp.data);
            })
            .catch(err => {
                console.warn(err);
            });
        commit('SET_CURRENT_USER', null);
        router.push({name: 'login'});
    },

    // Validates the current user's token and refreshes it
    // with new data from the API.
    validate({ commit, state }) {
        if (!state.currentUser) {
            return Promise.resolve(null)
        }

        return axios
            .post('/api/auth/refresh')
            .then((response) => {
                const user = response.data
                commit('SET_CURRENT_USER', user)
                return user
            })
            .catch((error) => {
                if (error.response && error.response.status === 401) {
                    commit('SET_CURRENT_USER', null)
                    router.push({name: 'login'})
                } else {
                    console.warn(error)
                }
                return null
            })
    },
}

// ===
// Private helpers
// ===

function getSavedState(key) {
    return JSON.parse(window.localStorage.getItem(key))
}

function saveState(key, state) {
    window.localStorage.setItem(key, JSON.stringify(state))
}

function setDefaultAuthHeaders(state) {
    axios.defaults.headers.common.Authorization = state.currentUser
        ? `Bearer ${state.currentUser.access_token}`
        : ''
}
