import { Box, Container, Grid } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Text from "../../Components/atoms/Text";
import { API_URL } from "../../helper";
import CartOrderSummary from "./partials/CartOrderSummary";
import CartProductsList from "./partials/CartProductsList";
import { getCartAction } from "../../Redux/Actions/userAction";
import toast from "react-hot-toast";

const CartPage = () => {
  const user = useSelector((state) => {
    return state.userReducer;
  });

  const dispatch = useDispatch();
  const [cartList, setCartList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [disableCheckout, setDisableCheckout] = useState(true);

  const getCartData = async () => {
    try {
      const token = Cookies.get("userToken");
      const res = await axios.get(`${API_URL}/users/cart/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success && res.data.data) {
        const resDataData = res.data.data;
        dispatch(getCartAction(resDataData));
        let tempData = [];
        resDataData.forEach((value, idx) => {
          tempData.push({ ...value, selected: false });
        });

        setCartList(tempData);
        setIsLoading(false);
      } else if (res.data.success && !res.data.data) {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("Something went wrong, please try again");
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <div style={{ paddingBottom: "5rem" }}>
      <Container sx={{ mt: 5, minHeight: '100%' }}>
        <Box>
          <Text fontWeight="bold" fontSize="h5">
            My Cart
          </Text>
        </Box>
        {!isLoading && (
          <Box>
            <Grid container spacing={1} sx={{ py: 3 }}>
              <Grid item xs={12} md={8}>
                <Box sx={{ m: 1 }}>
                  <CartProductsList
                    cartList={cartList}
                    setCartList={setCartList}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                    setDisableCheckout={setDisableCheckout}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ m: 1 }}>
                  <CartOrderSummary
                    cartList={cartList}
                    totalPrice={totalPrice}
                    disableCheckout={disableCheckout}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </div>
  );
};

export default CartPage;
