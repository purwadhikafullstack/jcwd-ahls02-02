import { Box, Card, Divider, Grid } from "@mui/material";
import { API_IMAGE_URL } from "../helper";
import Text from "./atoms/Text";

const AdminOrderCard = (props) => {
  const { orderData } = props;

  let statusColor = ""

  switch (orderData.status) {
    case "Waiting for Prescription Validation":
    case "Waiting for Payment":
    case "Waiting for Confirmation":
    case "Cancelled":
      statusColor = "error"
      break;
    case "Processed":
    case "Sent":
      statusColor="secondary"
      break
    case "Confirmed":
      statusColor="primary"
      break
    default: statusColor="black"
  }

  return (
    <>
      <Card>
        <Box
          sx={{
            mx: 2,
            my: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Text fontSize="subtitle2">
              Invoice Number : {orderData.invoice_number}
            </Text>
            <Text fontSize="subtitle2">
              Created Date : {orderData.created_at.substring(0, 10)}
            </Text>
          </Box>
          <Box>
            <Text alignText="right" fontWeight="medium" fontSize="subtitle2" color={statusColor}>{orderData.status}</Text>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ mx: 2, my: 1 }}>
          {orderData.content.map((value, index) => {
            return (
              <Grid container alignItems="center" key={index}>
                <Grid item xs={2}>
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
                      src={`${API_IMAGE_URL}${value.image}`}
                      style={{ width: "85px", maxWidth: "100%" }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Text fontWeight="bold" fontSize="subtitle1">
                    {value.product_name}
                  </Text>
                  <Text>
                    x {value.quantity} {value.unit}
                  </Text>
                </Grid>
                <Grid item xs={2}>
                  <Text textAlign="right" fontSize="subtitle2">
                    IDR
                    {(value.quantity * value.selling_price).toLocaleString()}
                  </Text>
                </Grid>
              </Grid>
            );
          })}
        </Box>
        <Divider />
        <Box sx={{ mx: 2, my: 2 }}>
          <Text textAlign="right">
            IDR{orderData.subtotal.toLocaleString()}
          </Text>
        </Box>
      </Card>
    </>
  );
};

export default AdminOrderCard;
