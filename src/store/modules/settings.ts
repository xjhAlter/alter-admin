const defaultSetting = {
    title: 'Alter admin',
    fixedHeader: false,
    sidebarLogo: false,
    hiddenSideBar: false,
}

type Tvalue = string | boolean

export interface ISettingsState {
    [key: string]: Tvalue
}

const state: ISettingsState = {
    title: defaultSetting.title,
    fixedHeader: defaultSetting.fixedHeader,
    sidebarLogo: defaultSetting.sidebarLogo,
}

const mutations = {
    CHANGE_SETTING: (
        state: ISettingsState,
        { key, value }: { key: string; value: Tvalue }
    ): void => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    },
}

const actions = {
    changeSetting({ commit }: any, data: any) {
        commit('CHANGE_SETTING', data)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}
