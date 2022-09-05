import { Delete } from "@mui/icons-material";
import { Box, Card, Checkbox, Divider, Grid, IconButton } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Text from "../../../Components/atoms/Text";
import NumberStepper from "../../../Components/NumberStepper";
import { API_IMAGE_URL, API_URL } from "../../../helper";
import { editCartAction } from "../../../Redux/Actions/userAction";

const CartProductsList = (props) => {
  const {
    cartList,
    setCartList,
    totalPrice,
    setTotalPrice,
    setDisableCheckout,
  } = props;

  const [selectAll, setSelectAll] = useState(false);

  const userData = useSelector((state) => {
    return state.userReducer;
  });
  const dispatch = useDispatch();

  // from numberstepper component
  const onQuantityChange = async (newValue, type, itemIndex) => {
    try {
      const cartId = cartList[itemIndex].id;
      const selling_price = cartList[itemIndex].selling_price;
      const token = Cookies.get("userToken");
      const res = await axios.patch(
        `${API_URL}/users/cart/${userData.id}`,
        { cartId, selling_price, newQuantity: newValue },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        dispatch(editCartAction(res.data.data));

        // update value in cart state
        let tempCart = [...cartList];
        tempCart[itemIndex].quantity = newValue;
        setCartList(tempCart);

        // update total price in cart order summary if item is already selected
        if (tempCart[itemIndex].selected) {
          let tempTotalPrice = totalPrice;
          if (type === "remove") {
            tempTotalPrice -= tempCart[itemIndex].selling_price;
          } else if (type === "add") {
            tempTotalPrice += tempCart[itemIndex].selling_price;
          }
          setTotalPrice(tempTotalPrice);
        }
      } else {
        toast.error("Something went wrong, please try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    }
  };

  // if user click checkbox on item
  const handleSelectItem = (checkValue, itemIndex) => {
    let tempCart = [...cartList];
    let tempTotalPrice = 0;
    let itemSelected = false;
    let itemIsAllSelected = true;

    // update selected status for item clicked
    tempCart[itemIndex].selected = checkValue;

    // sum total price and check if there are any selected item
    tempCart.forEach((value) => {
      if (value.selected) {
        tempTotalPrice += value.quantity * value.selling_price;
        itemSelected = true;
      } else {
        itemIsAllSelected = false;
      }
    });

    // uncheck select all
    if (!checkValue && selectAll) {
      setSelectAll(false);
    }
    if (itemIsAllSelected) {
      setSelectAll(true);
    }

    setCartList(tempCart);
    setTotalPrice(tempTotalPrice);

    // if there are no item selected, then user can't click checkout button
    if (itemSelected) {
      setDisableCheckout(false);
    } else {
      setDisableCheckout(true);
    }
  };

  const handleSelectAll = (checkValue) => {
    setSelectAll(checkValue);
    setDisableCheckout(!checkValue)
    let tempCartList = [...cartList];
    let tempTotalPrice = 0;

    tempCartList.forEach((value) => {
      value.selected = checkValue;
      if (checkValue) {
        tempTotalPrice += value.quantity * value.selling_price;
      }
    });

    setCartList(tempCartList);
    setTotalPrice(tempTotalPrice);
  };

  const handleDelete = async (itemIndex) => {
    try {
      const itemCartId = cartList[itemIndex].id;
      const token = Cookies.get("userToken");
      const res = await axios.delete(
        `${API_URL}/users/cart/${userData.id}/${itemCartId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        let tempCartList = [...cartList];
        tempCartList.splice(itemIndex, 1);
        setCartList(tempCartList);

        dispatch(editCartAction(res.data.data));
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    }
  };

  const printCartList = () => {
    return (
      <>
        {cartList.map((value, index) => {
          return (
            <>
              <Grid container alignItems="center">
                <Grid item xs={1}>
                  <Checkbox
                    checked={value.selected}
                    onClick={(e) => handleSelectItem(e.target.checked, index)}
                  />
                </Grid>
                <Grid item xs={11} sx={{ pl: { xs: 2, sm: 0 } }}>
                  <Box sx={{ textAlign: "left" }}>
                    <Grid container alignItems="center">
                      <Grid item xs={5} sm={3} sx={{ height: "100px" }}>
                        <Box
                          display="flex"
                          sx={{
                            height: "100px",
                            alignItems: "center",
                            mx: 1,
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={`${API_IMAGE_URL}${value.image}`}
                            style={{ width: "100px", maxWidth: "100%" }}
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={7} sm={6}>
                        <Text fontWeight="medium">{value.name}</Text>
                        <Text fontSize="body2">
                          IDR {value.selling_price.toLocaleString()}
                        </Text>
                        <Text fontSize="body2">
                          Current Stock : {value.current_stock} {value.unit}
                        </Text>
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <Text
                          fontSize="h6"
                          sx={{
                            display: { xs: "none", sm: "block" },
                            textAlign: "right",
                          }}
                        >
                          IDR{" "}
                          {(
                            value.selling_price * value.quantity
                          ).toLocaleString()}
                        </Text>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                </Grid>
                <Grid item xs={12} sx={{ pt: 2 }}>
                  <Box sx={{ display: "flex", justifyContent: "right" }}>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(index)}
                    >
                      <Delete />
                    </IconButton>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ my: "auto", ml: 1 }}>
                      <NumberStepper
                        value={value.quantity}
                        index={index}
                        onChange={onQuantityChange}
                        maxValue={value.current_stock}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              {index !== cartList.length - 1 && <Divider sx={{ py: 2 }} />}
            </>
          );
        })}
      </>
    );
  };

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <Checkbox
            checked={selectAll}
            onClick={(e) => handleSelectAll(e.target.checked)}
          />
        </Grid>
        <Grid item xs={11} sx={{ pl: { xs: 2, sm: 0 } }}>
          <Text>Select All</Text>
        </Grid>
      </Grid>
      <Divider />
      {/* LIST ITEM */}
      {printCartList()}
    </Card>
  );
};

export default CartProductsList;
