import { Card, Box, Divider, Grid } from "@mui/material";
import Button from "../../../Components/atoms/Button";
import Text from "../../../Components/atoms/Text";

const CheckoutSummary = (props) => {
  const { totalProductPrice, shippingPrice } = props;
  const totalPrice = totalProductPrice + shippingPrice

  return (
    <>
      <Card variant="outlined" sx={{ p: 2 }}>
        <Box>
          <Text fontSize="h6" fontWeight="bold">
            Payment Summary
          </Text>
        </Box>
        <Divider />
        <Box sx={{ px: 2, pt:2 }}>
          <Grid container alignItems="center" sx={{ pb: 1 }}>
            <Grid item xs={12} md={2}>
              <Text>Product(s) Price</Text>
            </Grid>
            <Grid item xs={12} md={10}>
              <Grid container alignItems="center">
                <Grid item sm={7} sx={{display:{xs:"hidden",sm:"block"}}} />
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
            <Button variant="contained" color="primary">
              Select Payment
            </Button>
          </Box>
        </Box>
      </Card>
    </>
  );
};

export default CheckoutSummary;
