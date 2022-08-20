import Cookies from 'js-cookie'

export const loginAction = (data) => {
    return {
        type: "LOGIN_SUCCESS",
        payload: data
    }
}

export const logoutAction = () => {
    Cookies.remove("userToken")
    return {
        type: "LOGOUT"
    }
}