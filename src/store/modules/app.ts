import { storageLocal } from '@/utils/storage'

export interface IAppState {
    sidebar: {
        opened: boolean
        withoutAnimation: boolean
    }
    device: string
}

const state: IAppState = {
    sidebar: {
        opened: storageLocal.getItem('sidebarStatus')
            ? !!+storageLocal.getItem('sidebarStatus')
            : true,
        withoutAnimation: false,
    },
    device: 'desktop',
}

const mutations = {
    TOGGLE_SIDEBAR: (state: IAppState): void => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnimation = false
        storageLocal.setItem('sidebarStatus', state.sidebar.opened ? 1 : 0)
    },
    CLOSE_SIDEBAR: (state: IAppState, withoutAnimation: boolean): void => {
        storageLocal.setItem('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE: (state: IAppState, device: string): void => {
        state.device = device
    },
}

const actions = {
    toggleSidebar({ commit }: any): void {
        commit('TOGGLE_SIDEBAR')
    },
    closeSidebar({ commit }: any, { withoutAnimation }: any): void {
        commit('CLOSE_SIDEBAR', withoutAnimation)
    },
    toggleDevice({ commit }: any, device: string): void {
        commit('TOGGLE_DEVICE', device)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
