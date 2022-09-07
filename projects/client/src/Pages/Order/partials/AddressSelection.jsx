import { Box, Divider, Card, Grid, Chip } from "@mui/material";
import Text from "../../../Components/atoms/Text";
import Button from "../../../Components/atoms/Button";
import { useSelector } from "react-redux";
import { Phone } from "@mui/icons-material";
import ModalSelectAddress from "./ModalSelectAddress";
import { useState } from "react";

const AddressSelection = (props) => {
  const {
    addressList,
    setAddressList,
    selectedAddress,
    setSelectedAddress,
    setShippingPrice,
  } = props;

  const [openSelectAddress, setOpenSelectAddress] = useState(false);

  const user = useSelector((state) => {
    return state.userReducer;
  });

  return (
    <>
      <Card variant="outlined" sx={{ p: 2, height: "175px" }}>
        <Text fontSize="h6" fontWeight="bold">
          Shipping Address
        </Text>
        <Divider />
        {!selectedAddress ? (
          <Box sx={{ p: 2 }}>
            <Box sx={{ py: 1 }}>
              <Button
                variant="contained"
                onClick={() => setOpenSelectAddress(true)}
              >
                Select Address
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ px: 2, pt: 2 }}>
            <Grid container alignItems="center">
              <Grid item xs={12}>
                <Box sx={{ display: "flex", pb: 1 }}>
                  <Text fontWeight="bold">{user.name}</Text>
                  <Text sx={{ mx: 2 }}>|</Text>
                  <Text sx={{ display: "flex", alignItems: "center" }}>
                    <Phone sx={{ fontSize: "20px", mr: 1 }} color="primary" />
                    {user.phone_number}
                  </Text>
                  {selectedAddress.default_address === "true" && (
                    <Box sx={{ pl: 1 }}>
                      <Chip label="Default" color="primary" size="small" />
                    </Box>
                  )}
                </Box>
                <Box>
                  <Text>
                    {selectedAddress.street}, {selectedAddress.city_label},{" "}
                    {selectedAddress.province_label},{" "}
                    {selectedAddress.postal_code}
                  </Text>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ pt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenSelectAddress(true)}
              >
                Change Address
              </Button>
            </Box>
          </Box>
        )}
        <ModalSelectAddress
          isOpen={openSelectAddress}
          setOpen={setOpenSelectAddress}
          toggle={() => {
            setOpenSelectAddress(false);
          }}
          addressList={addressList}
          setAddressList={setAddressList}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
          setShippingPrice={setShippingPrice}
        />
      </Card>
    </>
  );
};

export default AddressSelection;
