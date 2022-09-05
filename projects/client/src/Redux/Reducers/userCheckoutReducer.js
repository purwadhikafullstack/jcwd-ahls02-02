const INITIAL_STATE = {
  order: [],
};

export const userCheckoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "STORE_CHECKOUT_DATA":
      return {
        ...state,
        ...action.payload,
      };
    // Reset when user finished checkout
    case "RESET_CHECKOUT_DATA":
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};
