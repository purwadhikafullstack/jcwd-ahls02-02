import { Card, Box, Divider, Grid } from "@mui/material";
import Button from "../../../Components/atoms/Button";
import Text from "../../../Components/atoms/Text";
import ModalConfirm from "../../../Components/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import ModalAlert from "../../../Components/ModalAlert";
import axios from "axios";
import { API_URL } from "../../../helper";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { editCartAction } from "../../../Redux/Actions/userAction";
import toast from "react-hot-toast";

const CheckoutSummary = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    productList,
    selectedAddress,
    shippingMethod,
    totalProductPrice,
    shippingPrice,
  } = props;
  const totalPrice = totalProductPrice + shippingPrice;

  const userData = useSelector((state) => {
    return state.userReducer;
  });

  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [confirmCheckout, setConfirmCheckout] = useState(false);

  const [openModalAlert, setOpenModalAlert] = useState(false);
  const [modalAlertType, setModalAlertType] = useState("");

  const handleCheckout = async () => {
    try {
      setConfirmCheckout(false);
      const data = {
        productList,
        selectedAddress,
        shippingMethod,
        totalProductPrice,
        shippingPrice,
        status: "Waiting for Payment",
      };
      const token = Cookies.get("userToken");
      const res = await axios.post(
        `${API_URL}/users/order/${userData.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (res.data.success) {
        dispatch(editCartAction(res.data.data.newCartData));
        setModalAlertType("success");
        setOpenModalAlert(true);
      }
    } catch (error) {
      console.log(error);
      setConfirmCheckout(false);
      toast.error("Something went wrong, please try again");
    }
  };

  useEffect(() => {
    if (confirmCheckout) {
      handleCheckout();
    }
  }, [confirmCheckout]);

  return (
    <>
      <Card variant="outlined" sx={{ p: 2 }}>
        <Box>
          <Text fontSize="h6" fontWeight="bold">
            Payment Summary
          </Text>
        </Box>
        <Divider />
        <Box sx={{ px: 2, pt: 2 }}>
          <Grid container alignItems="center" sx={{ pb: 1 }}>
            <Grid item xs={12} md={2}>
              <Text>Product(s) Price</Text>
            </Grid>
            <Grid item xs={12} md={10}>
              <Grid container alignItems="center">
                <Grid
                  item
                  sm={7}
                  sx={{ display: { xs: "hidden", sm: "block" } }}
                />
                <Grid item xs={12} sm={5}>
                  <Grid container>
                    <Grid item xs={6} sm={5} md={8}>
                      <Text textAlign="right" fontSize="subtitle1">
                        IDR
                      </Text>
                    </Grid>
                    <Grid item xs={6} sm={7} md={4}>
                      <Text textAlign="right">
                        {totalProductPrice.toLocaleString()}
                      </Text>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={2}>
              <Text>Shipping Cost</Text>
            </Grid>
            <Grid item xs={12} md={10}>
              <Grid container alignItems="center">
                <Grid item sm={7} />
                <Grid item xs={12} sm={5}>
                  <Grid container>
                    <Grid item xs={6} sm={5} md={8}>
                      <Text textAlign="right" fontSize="subtitle1">
                        IDR
                      </Text>
                    </Grid>
                    <Grid item xs={6} sm={7} md={4}>
                      <Text textAlign="right">
                        {shippingPrice.toLocaleString()}
                      </Text>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="center" sx={{ pt: 1 }}>
            <Grid item xs={3} md={2}>
              <Text fontSize="h6" fontWeight="bold">
                Total Payment
              </Text>
            </Grid>
            <Grid item xs={9} md={10}>
              <Grid container alignItems="center">
                <Grid item sm={7} />
                <Grid item xs={12} sm={5}>
                  <Grid container>
                    <Grid item xs={5} sm={8}>
                      <Text textAlign="right" fontSize="subtitle1">
                        IDR
                      </Text>
                    </Grid>
                    <Grid item xs={7} sm={4}>
                      <Text textAlign="right">
                        {totalPrice.toLocaleString()}
                      </Text>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box textAlign="right" sx={{ pt: 1 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenModalConfirm(true)}
              disabled={!shippingPrice}
            >
              Finish Checkout
            </Button>
          </Box>
          <ModalConfirm
            isOpen={openModalConfirm}
            setOpen={setOpenModalConfirm}
            type="confirm"
            toggle={() => setOpenModalConfirm(false)}
            text={"Are you sure you want to checkout these items?"}
            handleConfirm={() => setConfirmCheckout(true)}
          />
          <ModalAlert
            isOpen={openModalAlert}
            type={modalAlertType}
            setOpen={setOpenModalAlert}
            toggle={() => setOpenModalAlert(false)}
            handleConfirm={() => {
              setOpenModalAlert(false);
              navigate("/order");
            }}
          >
            <Text>Checkout success!</Text>
            <Text>
              Please transfer to this account so we can process your order:
            </Text>
            <Text textAlign="center" fontSize="h6" fontWeight="bold">
              1240-9902-09274
            </Text>
          </ModalAlert>
        </Box>
      </Card>
    </>
  );
};

export default CheckoutSummary;
