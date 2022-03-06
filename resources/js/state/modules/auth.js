export default {
    state: {
        currentUser :   undefined,
    },
    mutations: {
        SET_CURRENT_USER (state, newValue) {
            state.currentUser = newValue;
        }
    },
    getters: {
        loggedIn (state) {
            return !!state.currentUser;
        }
    },
    actions: {
        // Logs in the current user.
        logIn({ commit, dispatch, getters }, { email, password } = {}) {
            console.log("STORE::ACTIONS ~ logIn - username, password -> ", email, password);
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
            commit('SET_CURRENT_USER', null)
        },

        // Validates the current user's token and refreshes it
        // with new data from the API.
        validate({ commit, state }) {
            if (!state.currentUser) return Promise.resolve(null)

            return axios
                .post('/api/auth/me', {},{headers: {Authorization: `Bearer ${state.currentUser.access_token}`}})
                .then((response) => {
                    const user = response.data
                    commit('SET_CURRENT_USER', user)
                    return user
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        commit('SET_CURRENT_USER', null)
                    } else {
                        console.warn(error)
                    }
                    return null
                })
        },
    }

}
