const INITIAL_STATE = {
  products:[],
}

export const productsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case "GET_PRODUCTS_DATA_SUCCESS":
          return {
              ...state,
              ...action.payload
          }
      default:
          return state;
  }
}