const INITIAL_STATE = {
  id: null,
  role: "",
  name: "",
  verified_status: "",
  email: "",
  phone_number: "",
  profile_picture: "",
  gender: "",
  cart: [],
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        ...action.payload,
      };
    case "LOGOUT":
      return INITIAL_STATE;
    case "GET_PROFILE_DATA":
      return {
        ...state,
        ...action.payload,
      };
    case "EDIT_PROFILE":
      return {
        ...state,
        ...action.payload,
      };
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "EDIT_CART":
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};
