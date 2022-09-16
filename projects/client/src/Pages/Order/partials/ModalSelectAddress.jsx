import { Modal, Backdrop, Fade, Box, Card, Grid, Chip } from "@mui/material";
import Text from "../../../Components/atoms/Text";
import Button from "../../../Components/atoms/Button";
import { AddCircleOutlined } from "@mui/icons-material";
import { useState } from "react";
import ModalAddress from "../../../Components/ModalAddress";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 30,
};

const ModalSelectAddress = (props) => {
  const {
    isOpen,
    toggle,
    addressList,
    setAddressList,
    selectedAddress,
    setSelectedAddress,
    setShippingPrice,
  } = props;

  const handleCloseModal = () => {
    toggle();
  };

  const handleSelectAddress = (value) => {
    setSelectedAddress(value);
    setShippingPrice(0);
  };

  const [openAddAddressModal, setOpenAddAddressModal] = useState(false);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          <Box sx={{ pb: 1 }}>
            <Text fontSize="h5" fontWeight="bold">
              Select Shipping Address
            </Text>
          </Box>
          <Box sx={{ py: 2 }}>
            {addressList?.map((value, index) => {
              return (
                // <>
                <Card variant="outlined" sx={{ p: 2, m: 1 }} key={`k-${index}`}>
                  <Grid container alignItems="center">
                    <Grid item xs={12} sm={9} sx={{ px: 1 }}>
                      <Text>
                        {value.street}, {value.city_label},{" "}
                        {value.province_label}, {value.postal_code}
                        {value.default_address === "true" && (
                          <>
                            {" "}
                            <Chip
                              label="Default"
                              color="primary"
                              size="small"
                            />
                          </>
                        )}
                      </Text>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Box sx={{ textAlign: { xs: "right", sm: "center" } }}>
                        {value.id === selectedAddress?.id ? (
                          <Text
                            color="primary"
                            fontSize="subtitle2"
                            sx={{
                              p: { xs: 1, sm: 0 },
                              textAlign: { xs: "right", sm: "center" },
                            }}
                          >
                            Selected
                          </Text>
                        ) : (
                          <Button
                            color="secondary"
                            variant="outlined"
                            onClick={() => handleSelectAddress(value)}
                          >
                            Select
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
                // </>
              );
            })}
            <Box sx={{ p: 1 }}>
              <Button
                variant="outlined"
                width="100%"
                color="inherit"
                onClick={() => setOpenAddAddressModal(true)}
              >
                <AddCircleOutlined /> Add New Address
              </Button>
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              width="100%"
              sx={{ mr: 2 }}
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Box>
          <ModalAddress
            isOpen={openAddAddressModal}
            setOpen={setOpenAddAddressModal}
            toggle={() => {
              setOpenAddAddressModal(!openAddAddressModal);
            }}
            addressModalMode={"Add"}
            setAddressList={setAddressList}
            selectedAddress={null}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalSelectAddress;
