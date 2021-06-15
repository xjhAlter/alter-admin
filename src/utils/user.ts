//用户信息
export function getUserInfo() {
    let userInfo: any = localStorage.getItem('userInfo');
    return userInfo == "undefined" ? "" : JSON.parse(userInfo);
}
export function setUserInfo(userInfo: any) {
    return localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

//token
export function setToken(token: any) {
    return localStorage.setItem('token', token);
}

export function getToken() {
    return localStorage.getItem('token');
}

//移除所有用户信息
export function removeUserInfo() {
    localStorage.clear()
}