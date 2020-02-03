const state = {
    level: 1,
    title: "导航"
}

const getters = {
    level: state => state.level,
    title: state => state.title
}

const actions = {
    async updateLevel({ commit }) {
        commit('setLevel')
    },
    async updateTitle({ commit }) {
        commit('setTitle')
    }
}

const mutations = {
    setLevel(state, level) {
        state.level = level;
    },
    setTitle(state, title) {
        state.title = title;
    }  
}

export default {
    state,
    getters,
    actions,
    mutations
}