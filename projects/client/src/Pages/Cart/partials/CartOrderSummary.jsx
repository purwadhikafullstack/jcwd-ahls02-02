import { Box, Card, Divider, Grid } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../Components/atoms/Button";
import Text from "../../../Components/atoms/Text";

const CartOrderSummary = (props) => {
  const { cartList, totalPrice, disableCheckout } = props;

  const userData = useSelector((state) => {
    return state.userReducer;
  });

  const printOrderSummary = () => {
    return (
      <>
        {cartList.map((value) => {
          return (
            <>
              {value.selected === true && (
                <>
                  <Grid item xs={7}>
                    <Text fontSize="subtitle2">
                      {value.name} ({value.quantity} {value.unit})
                    </Text>
                  </Grid>
                  <Grid item xs={5}>
                    <Text fontSize="subtitle2" textAlign="right">
                      {(value.quantity * value.selling_price).toLocaleString()}
                    </Text>
                  </Grid>
                </>
              )}
            </>
          );
        })}
      </>
    );
  };

  return (
    <Card variant="outlined" sx={{ p: 2 }}>
      <Text fontSize="h6" fontWeight="bold" sx={{ pb: 1 }}>
        Summary
      </Text>
      <Divider />
      <Grid container sx={{ p: 1 }}>
        <Grid item xs={7}>
          <Text fontWeight="medium">Items</Text>
        </Grid>
        <Grid item xs={5}>
          <Text fontWeight="medium" textAlign="right">
            SubTotal
          </Text>
        </Grid>
      </Grid>
      <Divider />
      <Grid container sx={{ p: 1 }}>
        {printOrderSummary()}
      </Grid>
      <Divider />
      <Box sx={{ p: 1, display: "flex", justifyContent: "space-between" }}>
        <Text fontWeight="medium">Total</Text>
        <Text>IDR {totalPrice.toLocaleString()}</Text>
      </Box>
      <Box sx={{ p: 1 }}>
        <Button
          variant="contained"
          color="primary"
          width="100%"
          disabled={disableCheckout}
        >
          Checkout
        </Button>
      </Box>
    </Card>
  );
};

export default CartOrderSummary;
