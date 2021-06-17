const getters = {
    sidebar: (state: any) => state.app.sidebar,
    cachedViews: (state: any) => ["RouterCenter"],
    token: (state: any) => state.user.token,
    userInfo: (state: any) => state.user.userInfo,
}

export default getters