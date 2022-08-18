const INITIAL_STATE = {
    id: null,
    role: "",
    name: "",
    verified_status: "",
    email: "",
    phone_number: "",
    profile_picture: "",
    gender: "",
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                ...action.payload
            };
        case "LOGOUT":
            return INITIAL_STATE;
        default:
            return state;
    }
}