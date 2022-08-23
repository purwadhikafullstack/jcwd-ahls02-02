import { Divider, Grid, IconButton } from "@mui/material";
import Text from "../../../Components/atoms/Text";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Button from "../../../Components/atoms/Button";
import { useSelector } from "react-redux";
import { AddCircleOutline, Delete, Edit } from "@mui/icons-material";
import ModalAddress from "../../../Components/ModalAddress";

const Address = () => {
  const user = useSelector((state) => {
    return state.userReducer;
  });
  const [addressList, setAddressList] = useState(["jalan A", "jalan B"]);
  const [openModal, setOpenModal] = useState(false);
  const [addressModalMode, setAddressModalMode] = useState(null);

  const handleDelete = async (index) => {
    try {
      let tempAddress = [...addressList];
      tempAddress.splice(index, 1);
      setAddressList(tempAddress);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetDefault = (index) => {};

  const printAddressList = () => {
    return addressList.map((value, index) => {
      return (
        <>
          <Grid container alignItems="center" sx={{ m: 2 }}>
            <Grid item xs={8} sx={{ display: "flex" }}>
              <Grid container>
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <Text fontWeight="bold">{user.name}</Text>
                  <Text>|</Text>
                  <Text>{user.phone_number}</Text>
                </Grid>
                <Grid item xs={12} sx={{ display: "flex" }}>
                  <Text>{value}</Text>
                  <IconButton color="primary">
                    <Edit sx={{ fontSize: 20 }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={3} sx={{ textAlign: "right" }}>
              <Button variant="outlined" color="secondary">
                Set as Default
              </Button>
            </Grid>
            <Grid item xs={1}>
              <IconButton color="error" onClick={() => handleDelete(index)}>
                <Delete />
              </IconButton>
            </Grid>
          </Grid>
          <Divider variant="middle" />
        </>
      );
    });
  };

  return (
    <Grid container spacing={2}>
      <Grid sx={{ pb: 3 }}>
        <Text fontSize="h5">My Address</Text>
      </Grid>

      <Grid container alignItems="center">
        {addressList.length === 0 ? (
          <Grid items xs={12} alignItems="center">
            <Box sx={{ pb: 3 }}>
              <Text textAlign="center">You haven't added any address yet</Text>
              <Text textAlign="center">
                Click the button below to add your address
              </Text>
            </Box>
          </Grid>
        ) : (
          <Grid items xs={12}>
            {printAddressList()}
          </Grid>
        )}
        <Grid item xs={12} sx={{ pt: 3 }}>
          <Button
            width="200px"
            variant="contained"
            color="primary"
            onClick={() => {
              setOpenModal(true);
              setAddressModalMode("Add");
            }}
          >
            Add Address
          </Button>
        </Grid>
      </Grid>
      <ModalAddress
        isOpen={openModal}
        setOpen={setOpenModal}
        toggle={() => setOpenModal(!openModal)}
        addressModalMode={addressModalMode}
      />
    </Grid>
  );
};

export default Address;
