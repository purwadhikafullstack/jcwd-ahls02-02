import { Box, Card, Divider, Grid } from "@mui/material";
import Text from "../../../Components/atoms/Text";
import { API_IMAGE_URL } from "../../../helper";

const CheckoutOrderSummary = (props) => {
  const { productList } = props;
  return (
    <>
      <Card variant="outlined" sx={{ maxHeight: "50vh", overflowY: "auto" }}>
        <Box
          sx={{ p: 2, position: "sticky", top: 0, backgroundColor: "white" }}
        >
          <Text fontSize="h6" fontWeight="bold">
            Order Summary
          </Text>
        </Box>
        <Divider />
        <Box sx={{ px: 2, pb: 2 }}>
          {productList.map((value, index) => {
            return (
              <>
                <Grid container alignItems="center">
                  <Grid item xs={3} sx={{ height: "100px" }}>
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
                  <Grid item xs={9}>
                    <Grid container alignItems="center">
                      <Grid item xs={12} sm={7}>
                        <Text fontWeight="medium">{value.name}</Text>
                        <Text fontSize="body2">
                          {value.quantity} {value.unit} @ IDR{" "}
                          {value.selling_price.toLocaleString()}
                        </Text>
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <Text textAlign="right" fontSize="subtitle1">
                          IDR{" "}
                          {(
                            value.quantity * value.selling_price
                          ).toLocaleString()}
                        </Text>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {index !== productList.length - 1 && <Divider />}
              </>
            );
          })}
        </Box>
      </Card>
    </>
  );
};

export default CheckoutOrderSummary;
