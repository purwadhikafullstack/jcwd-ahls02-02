export const getProductsDataAction = (data) => {
  console.log("getProductsDataAction")
  console.log(data)
  return {
      type: "GET_PRODUCTS_DATA_SUCCESS",
      payload: data
  }
}