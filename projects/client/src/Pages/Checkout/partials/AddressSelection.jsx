import { Box, Divider, Card, Grid } from "@mui/material";
import Text from "../../../Components/atoms/Text";
import { useSelector } from "react-redux";
import Button from "../../../Components/atoms/Button";
import { Delete, Edit, Phone } from "@mui/icons-material";

const AddressSelection = (props) => {
  const { addressList, setAddressList, selectedAddress, setSelectedAddress } =
    props;

  // console.log("addressList", addressList);
  console.log("selectedAddress", selectedAddress);
  const user = useSelector((state) => {
    return state.userReducer;
  });

  return (
    <>
      <Card variant="outlined" sx={{ p: 2 }}>
        <Text fontSize="h6" fontWeight="bold">
          Address
        </Text>
        <Divider />
        {!selectedAddress ? (
          <Box sx={{ p: 2 }}>
            <Box sx={{ py: 1 }}>Select Shipment Address</Box>
            <Box sx={{ py: 1 }}>
              <Button variant="contained">Select Address</Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ p: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs={8}>
                <Box sx={{ display: "flex", pb: 1 }}>
                  <Text fontWeight="bold">{user.name}</Text>
                  <Text sx={{ mx: 2 }}>|</Text>
                  <Text sx={{ display: "flex", alignItems: "center" }}>
                    <Phone sx={{ fontSize: "20px", mr: 1 }} color="primary" />
                    {user.phone_number}
                  </Text>
                </Box>
                <Box>
                  <Text>
                    {selectedAddress.street}, {selectedAddress.city_label},{" "}
                    {selectedAddress.province_label},{" "}
                    {selectedAddress.postal_code}
                  </Text>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: "right" }}>
                  <Button variant="contained" color="primary">
                    Change Address
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
      </Card>
    </>
  );
};

export default AddressSelection;
