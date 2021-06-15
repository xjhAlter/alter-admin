const getters = {
    cachedViews: (state: any) => ["RouterCenter"],
    token: (state: any) => state.user.token,
    userInfo: (state: any) => state.user.userInfo,
}

export default getters