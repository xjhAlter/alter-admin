const state = {
    visitedViews: [],
    cachedViews: ['RouterCenter']
}

const mutations = {
    ADD_VISITED_VIEW: (state: { visitedViews: any[] }, view: { path: any; meta: { title: any } }) => {
        if (state.visitedViews.some(v => v.path === view.path)) return
        state.visitedViews.push(
            Object.assign({}, view, {
                title: view.meta.title ?? 'no-name'
            })
        )
    },
    ADD_CACHED_VIEW: (state: { cachedViews: any[] }, view: { name: any; meta: { noCache: any } }) => {
        if (state.cachedViews.includes(view.name)) return
        if (!view.meta.noCache) {
            state.cachedViews.push(view.name)
        }
    },
    DEL_VISITED_VIEW: (state: { visitedViews: any[] }, view: { path: any }) => {
        for (const [i, v] of state.visitedViews.entries()) {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1)
                break
            }
        }
    },
    DEL_CACHED_VIEW: (state: { cachedViews: any[] }, view: { name: any }) => {
        const index = state.cachedViews.indexOf(view.name)
        index > -1 && state.cachedViews.splice(index, 1)
    },

    DEL_OTHERS_VISITED_VIEWS: (state: { visitedViews: any[] }, view: { path: any }) => {
        state.visitedViews = state.visitedViews.filter(v => {
            return v.meta.affix || v.path === view.path
        })
    },
    DEL_OTHERS_CACHED_VIEWS: (state: { cachedViews: string | any[] }, view: { name: any }) => {
        const index = state.cachedViews.indexOf(view.name)
        if (index > -1) {
            state.cachedViews = state.cachedViews.slice(index, index + 1)
        } else {
            // if index = -1, there is no cached tags
            state.cachedViews = []
        }
    },

    DEL_ALL_VISITED_VIEWS: (state: { visitedViews: any[] }) => {
        // keep affix tags
        const affixTags = state.visitedViews.filter(tag => tag.meta.affix)
        state.visitedViews = affixTags
    },
    DEL_ALL_CACHED_VIEWS: (state: { cachedViews: never[] }) => {
        state.cachedViews = []
    },

    UPDATE_VISITED_VIEW: (state: { visitedViews: any }, view: { path: any }) => {
        for (let v of state.visitedViews) {
            if (v.path === view.path) {
                v = Object.assign(v, view)
                break
            }
        }
    }
}

const actions = {
    // @ts-ignore
    addView({ dispatch }, view) {
        dispatch('addVisitedView', view)
        dispatch('addCachedView', view)
    },
    // @ts-ignore
    addVisitedView({ commit }, view) {
        commit('ADD_VISITED_VIEW', view)
    },
    // @ts-ignore
    addCachedView({ commit }, view) {
        commit('ADD_CACHED_VIEW', view)
    },
    // @ts-ignore
    delView({ dispatch, state }, view) {
        return new Promise(resolve => {
            dispatch('delVisitedView', view)
            dispatch('delCachedView', view)
            resolve({
                visitedViews: [...state.visitedViews],
                cachedViews: [...state.cachedViews]
            })
        })
    },
    // @ts-ignore
    delVisitedView({ commit, state }, view) {
        return new Promise(resolve => {
            commit('DEL_VISITED_VIEW', view)
            resolve([...state.visitedViews])
        })
    },
    // @ts-ignore
    delCachedView({ commit, state }, view) {
        return new Promise(resolve => {
            commit('DEL_CACHED_VIEW', view)
            resolve([...state.cachedViews])
        })
    },
    // @ts-ignore
    delOthersViews({ dispatch, state }, view) {
        return new Promise(resolve => {
            dispatch('delOthersVisitedViews', view)
            dispatch('delOthersCachedViews', view)
            resolve({
                visitedViews: [...state.visitedViews],
                cachedViews: [...state.cachedViews]
            })
        })
    },
    // @ts-ignore
    delOthersVisitedViews({ commit, state }, view) {
        return new Promise(resolve => {
            commit('DEL_OTHERS_VISITED_VIEWS', view)
            resolve([...state.visitedViews])
        })
    },
    // @ts-ignore
    delOthersCachedViews({ commit, state }, view) {
        return new Promise(resolve => {
            commit('DEL_OTHERS_CACHED_VIEWS', view)
            resolve([...state.cachedViews])
        })
    },
    // @ts-ignore
    delAllViews({ dispatch, state }, view) {
        return new Promise(resolve => {
            dispatch('delAllVisitedViews', view)
            dispatch('delAllCachedViews', view)
            resolve({
                visitedViews: [...state.visitedViews],
                cachedViews: [...state.cachedViews]
            })
        })
    },
    // @ts-ignore
    delAllVisitedViews({ commit, state }) {
        return new Promise(resolve => {
            commit('DEL_ALL_VISITED_VIEWS')
            resolve([...state.visitedViews])
        })
    },
    // @ts-ignore
    delAllCachedViews({ commit, state }) {
        return new Promise(resolve => {
            commit('DEL_ALL_CACHED_VIEWS')
            resolve([...state.cachedViews])
        })
    },
    // @ts-ignore
    updateVisitedView({ commit }, view) {
        commit('UPDATE_VISITED_VIEW', view)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}