export const storeCheckoutAction = (data) => {
  return {
    type: "STORE_CHECKOUT_DATA",
    payload: data,
  };
};
export const resetCheckoutAction = () => {
  return {
    type: "RESET_CHECKOUT_DATA",
  };
};
