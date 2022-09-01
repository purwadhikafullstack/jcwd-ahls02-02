import { Card, Box, Divider, Grid } from "@mui/material";
import Text from "../../../Components/atoms/Text";

const CheckoutSummary = (props) => {
  const { totalProductPrice, shippingPrice, totalPrice } = props;

  console.log("totalProductPrice", totalProductPrice);
  return (
    <>
      <Card variant="outlined" sx={{ p: 2 }}>
        <Box>
          <Text fontSize="h6" fontWeight="bold">
            Payment Summary
          </Text>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid container alignItems="center" sx={{pb:1}}>
            <Grid item xs={9}>
              <Text>Product(s) Price</Text>
            </Grid>
            <Grid item xs={3}>
              <Text textAlign="right">
                IDR {totalProductPrice.toLocaleString()}
              </Text>
            </Grid>
            <Grid item xs={9}>
              <Text>Shipping Price</Text>
            </Grid>
            <Grid item xs={3}>
              <Text textAlign="right">
                IDR {shippingPrice.toLocaleString()}
              </Text>
            </Grid>
          </Grid>
          <Divider />
          <Grid container alignItems="center" sx={{pt:1}}>
            <Grid item xs={9}>
              <Text fontSize="subtitle1" fontWeight="medium">Total Payment</Text>
            </Grid>
            <Grid item xs={3}>
              <Text textAlign="right">
                IDR {totalPrice.toLocaleString()}
              </Text>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </>
  );
};

export default CheckoutSummary;
