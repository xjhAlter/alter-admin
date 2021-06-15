import { getToken, setToken, getUserInfo, setUserInfo, removeUserInfo } from "@/utils/user"
interface IUserInfo {
    username: string,
}

export interface IUserState {
    userInfo: IUserInfo,
    token: string | null,
}

const getDefaultState = () => {
    return {
        userInfo: getUserInfo(),
        token: getToken(),
    }
}

const state: IUserState = getDefaultState();

const mutations = {
    RESET_STATE: (state: IUserState) => {
        Object.assign(state, getDefaultState());
    },
    SET_USER_INFO: (state: IUserState, data: IUserInfo) => {
        state.userInfo = data;
    },
    SET_TOKEN: (state: IUserState, data: string) => {
        state.token = data;
    }
}

const actions = {
    login({ commit }: any, data: any) {
        return new Promise<void>((resolve) => {
            const { username, password } = data;
            const userInfo = { username };
            const token = 'token' + password; // 简单处理下
            commit('SET_USER_INFO', userInfo);
            commit('SET_TOKEN', token);
            setUserInfo(userInfo);
            setToken(token);
            resolve();
        })
    },
    logout({ commit }: any) {
        return new Promise<void>((resolve) => {
            removeUserInfo();
            commit('RESET_STATE');
            resolve();
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}