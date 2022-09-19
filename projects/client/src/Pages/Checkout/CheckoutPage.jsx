import { useLocation } from "react-router-dom";
import { Box, Container, Grid } from "@mui/material";
import Text from "../../Components/atoms/Text";
import { useEffect, useState } from "react";
import AddressSelection from "./partials/AddressSelection";
import CheckoutOrderSummary from "./partials/CheckoutOrderSummary";
import { useSelector } from "react-redux";
import CheckoutSummary from "./partials/CheckoutSummary";
import ShippingMethod from "./partials/ShippingMethod";

const CheckoutPage = () => {
  const location = useLocation();
  const userData = useSelector((state) => {
    return state.userReducer;
  });
  const productList = location.state.checkoutList;
  const totalProductPrice = location.state.totalProductPrice;

  const [addressList, setAddressList] = useState(userData.address);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [shippingMethod, setShippingMethod] = useState(null);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    addressList.forEach((value) => {
      if (value.default_address === "true") {
        setSelectedAddress(value);
      }
    });
    setIsLoading(false);
  }, []);

  return (<div style={{ paddingBottom: '2.5rem' }}>
    <Container sx={{ mt: 5, pb: 2 }}>
      <Box>
        <Text fontWeight="bold" fontSize="h5">
          Checkout
        </Text>
      </Box>
      {!isLoading && (
        <>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Box sx={{ m: 1 }}>
                <AddressSelection
                  addressList={addressList}
                  setAddressList={setAddressList}
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                  setShippingPrice={setShippingPrice}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ m: 1 }}>
                <ShippingMethod
                  selectedAddress={selectedAddress}
                  shippingMethod={shippingMethod}
                  setShippingMethod={setShippingMethod}
                  setShippingPrice={setShippingPrice}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ m: 1 }}>
            <CheckoutOrderSummary
              productList={productList}
              totalProductPrice={totalProductPrice}
            />
          </Box>
          <Box sx={{ m: 1 }}>
            <CheckoutSummary
              productList={productList}
              selectedAddress={selectedAddress}
              shippingMethod={shippingMethod}
              totalProductPrice={totalProductPrice}
              shippingPrice={shippingPrice}
            />
          </Box>
        </>
      )}
    </Container>
  </div>
  );
};

export default CheckoutPage;
