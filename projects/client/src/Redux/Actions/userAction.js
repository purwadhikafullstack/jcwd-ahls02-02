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

export const getProfileDataAction = (data) => {
    return {
        type: "GET_PROFILE_DATA",
        payload: data
    }
}

export const editProfileAction = (data) => {
    return {
        type: "EDIT_PROFILE",
        payload: data
    }
}

export const getCartAction = (data) => {
    console.log('get_cart', data)
    return {
        type: "GET_CART",
        payload: data
    }
}

export const editCartAction = (data) => {
    return {
        type: "EDIT_CART",
        payload: data
    }
}