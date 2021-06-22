const getters = {
    sidebar: (state: any) => state.app.sidebar,
    device: (state: any) => state.app.device,
    token: (state: any) => state.user.token,
    userInfo: (state: any) => state.user.userInfo,
    visitedViews: (state: any) => state.tagsView.visitedViews,
    cachedViews: (state: any) => state.tagsView.cachedViews,
}

export default getters