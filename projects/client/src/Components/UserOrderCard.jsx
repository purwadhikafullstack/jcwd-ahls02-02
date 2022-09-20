import { Box, Card, Divider, Grid } from "@mui/material";
import axios from "axios";
import { API_IMAGE_URL } from "../helper";
import Button from "./atoms/Button";
import Text from "./atoms/Text";

const AdminOrderCard = (props) => {
  const { orderData, handleCancelOrder, handleUpload, handleReceiveOrder } = props;
  const { status } = orderData;
  let statusColor = "";

  switch (orderData.status) {
    case "Waiting for Prescription Validation":
    case "Waiting for Payment":
    case "Waiting for Confirmation":
    case "Cancelled":
      statusColor = "error";
      break;
    case "Processed":
    case "Sent":
      statusColor = "secondary";
      break;
    case "Completed":
      statusColor = "primary";
      break;
    default:
      statusColor = "black";
  }

  // const handleCancelOrder = async () => {

  // };

  // const handleConfirmOrder = () => {
  //   if (status === "Waiting for Confirmation") {
  //   } else if (status === "Processed") {
  //   }
  // };

  return (
    <>
      <Card>
        <Grid
          container
          sx={{
            px: 2,
            py: 1,
            backgroundColor: "#f7fbfc",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={8}
            sx={{ alignItems: "center", order: { xs: 2, md: 1 } }}
          >
            <Box>
              <Text fontSize="subtitle2">
                Invoice Number : {orderData.invoice_number}
              </Text>
              <Text fontSize="subtitle2">
                Order Date : {orderData.created_at.substring(0, 10)}
              </Text>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ order: { xs: 1, md: 2 } }}>
            <Box>
              <Text
                textAlign="right"
                fontWeight="medium"
                fontSize="subtitle2"
                color={statusColor}
                sx={{ py: 1 }}
              >
                {status}
              </Text>
            </Box>
          </Grid>
        </Grid>
        <Divider />
        <Box sx={{ mx: 2, my: 1 }}>
          {orderData.content.map((value, index) => {
            return (
              <Grid container alignItems="center" key={index}>
                <Grid item xs={4} sm={2}>
                  <Box
                    display="flex"
                    sx={{
                      height: "85px",
                      alignItems: "center",
                      mx: 1,
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={`${API_IMAGE_URL}${value.product_image}`}
                      style={{ width: "85px", maxWidth: "100%" }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8} sm={8}>
                  <Text fontWeight="bold" fontSize="subtitle1">
                    {value.product_name}
                  </Text>
                  <Text>
                    {!value.hasOwnProperty("ingredients") ? (
                      <>
                        x {value.quantity} {value.unit}
                      </>
                    ) : (
                      <>
                        Ingredients:{" "}
                        {value.ingredients.map(
                          (ingredientsValue, ingredientsIndex) => {
                            return (
                              <span key={`ingredient-${ingredientsIndex}`}>
                                {ingredientsValue.product_name}
                                {ingredientsIndex <
                                  value.ingredients.length - 1 && `, `}
                              </span>
                            );
                          }
                        )}
                      </>
                    )}
                  </Text>
                  <Text sx={{ display: { xs: "block", sm: "none" } }}>
                    IDR
                    {!value.hasOwnProperty("ingredients") ? (
                      <>
                        {(
                          value.quantity * value.selling_price
                        ).toLocaleString()}
                      </>
                    ) : (
                      <>{value.subtotal_selling_price.toLocaleString()}</>
                    )}
                  </Text>
                </Grid>
                <Grid item xs={2} sx={{ display: { xs: "none", sm: "block" } }}>
                  <Text textAlign="right" fontSize="subtitle2">
                    IDR
                    {!value.hasOwnProperty("ingredients") ? (
                      <>
                        {(
                          value.quantity * value.selling_price
                        ).toLocaleString()}
                      </>
                    ) : (
                      <>{value.subtotal_selling_price.toLocaleString()}</>
                    )}
                  </Text>
                </Grid>
              </Grid>
            );
          })}
        </Box>
        <Divider />
        <Grid
          container
          sx={{ p: 2, alignItems: "center", backgroundColor: "#f7fbfc" }}
        >
          <Grid
            item
            xs={12}
            sm={9}
            sx={{
              pt: { xs: 1, sm: 0 },
              display: "flex",
              justifyContent: "flex-end",
              order: { xs: 2, sm: 1 },
            }}
          >
            {(status === "Waiting for Confirmation") && (
              <>
                <Box sx={{ mr: 1 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleCancelOrder(orderData.id)}
                  >
                    Cancel Order
                  </Button>
                </Box>
              </>
            )}
            {(status === "Waiting for Payment") && (
              <>
                <Box sx={{ mr: 1 }}>
                  <Button
                    variant="text"
                    color="error"
                    size="small"
                    onClick={() => handleCancelOrder(orderData.id)}
                  >
                    Cancel Order
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleUpload(orderData.id)}
                  >
                    Upload Payment
                  </Button>
                </Box>
              </>
            )}
            {(status === "Sent") && (
              <>
                <Box sx={{ mr: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleReceiveOrder(orderData.id)}
                  >
                    Confirm Received
                  </Button>
                </Box>
              </>
            )}

            {/* {status === "Waiting for Confirmation" ? (
                  <>Confirm Payment</>
                ) : status === "Processed" ? (
                  <>Send Order</>
                ) : null} */}
          </Grid>
          <Grid item xs={12} sm={3} sx={{ order: { xs: 1, sm: 2 } }}>
            <Box sx={{ minWidth: "100px" }}>
              <Text textAlign="right" fontWeight="bold">
                IDR{orderData.subtotal.toLocaleString()}
              </Text>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default AdminOrderCard;
