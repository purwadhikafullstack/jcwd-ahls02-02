import { Divider, Grid, IconButton } from "@mui/material";
import Text from "../../../Components/atoms/Text";
import { useEffect, useState } from "react";
import { Box } from "@mui/system";
import Button from "../../../Components/atoms/Button";
import { useDispatch, useSelector } from "react-redux";
import { Delete, Edit, Phone } from "@mui/icons-material";
import ModalAddress from "../../../Components/ModalAddress";
import ModalConfirm from "../../../Components/ModalConfirm";
import { ToastNotification } from "../../../Components/Toast";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "../../../helper";
import Cookies from "js-cookie";
import { editProfileAction } from "../../../Redux/Actions/userAction";

const Address = () => {
  const user = useSelector((state) => {
    return state.userReducer;
  });

  const dispatch = useDispatch();

  const [addressList, setAddressList] = useState(user.address);
  const [openModal, setOpenModal] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [addressModalMode, setAddressModalMode] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [indexDelete, setIndexDelete] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleDelete = (index) => {
    setIndexDelete(index);
    setOpenModalConfirm(true);
  };

  useEffect(() => {
    const handleDeleteAddress = async () => {
      try {
        const token = Cookies.get("userToken");
        const addressId = user.address[indexDelete].id;

        const res = await axios.delete(
          `${API_URL}/users/profile/address/${user.id}?addressId=${addressId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          dispatch(editProfileAction({ address: res.data.data }));
        } else {
          toast.error("There's an error");
        }
      } catch (error) {
        console.log(error);
        toast.error("Please try again");
      }
    };

    if (confirmDelete) {
      let tempAddress = [...addressList];
      tempAddress.splice(indexDelete, 1);
      setAddressList(tempAddress);

      handleDeleteAddress();
      setConfirmDelete(false);
      setIndexDelete(null);
    }
  }, [confirmDelete]);

  const handleSetDefault = async (addressValue) => {
    try {
      const token = Cookies.get("userToken");
      const addressId = addressValue.id;

      const res = await axios.patch(
        `${API_URL}/users/profile/default-address/${user.id}`,
        { addressId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(editProfileAction({ address: res.data.data }));
        setAddressList(res.data.data);
      } else {
        toast.error("Please try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("Please try again");
    }
  };

  const handleEdit = (addressValue, index) => {
    setSelectedAddress({ addressValue, index });
    setOpenModal(true);
    setAddressModalMode("Edit");
  };

  const printAddressList = () => {
    return (
      <>
        {addressList.map((value, index) => {
          return (
            <>
              <Grid container alignItems="center" sx={{ m: 2 }}>
                <Grid item xs={8} sx={{ display: "flex" }}>
                  <Grid container>
                    <Grid item xs={12} sx={{ display: "flex" }}>
                      <Text fontWeight="bold">{user.name}</Text>
                      <Text sx={{ mx: 2 }}>|</Text>
                      <Text sx={{ display: "flex", alignItems: "center" }}>
                        <Phone
                          sx={{ fontSize: "20px", mr: 1 }}
                          color="primary"
                        />
                        {user.phone_number}
                      </Text>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Text>
                        {value.street}, {value.city_label},{" "}
                        {value.province_label}, {value.postal_code}
                      </Text>
                      <IconButton color="primary">
                        <Edit
                          sx={{ fontSize: 20 }}
                          onClick={() => handleEdit(value, index)}
                        />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={3} sx={{ textAlign: "right" }}>
                  {value.default_address === "true" ? (
                    <Text
                      textAlign="right"
                      fontWeight="bold"
                      color="primary"
                      sx={{ mr: 1 }}
                    >
                      Default Address
                    </Text>
                  ) : (
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleSetDefault(value, index)}
                    >
                      Set as Default
                    </Button>
                  )}
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
        })}
      </>
    );
  };

  return (
    <Grid container spacing={2}>
      <ToastNotification />
      <Grid sx={{ pb: 2 }}>
        <Text fontSize="h5" fontWeight="bold">
          My Address
        </Text>
        <Text>Add your address</Text>
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
              setSelectedAddress(null);
            }}
          >
            Add Address
          </Button>
        </Grid>
      </Grid>
      <ModalAddress
        isOpen={openModal}
        setOpen={setOpenModal}
        toggle={() => {
          setOpenModal(!openModal);
          setAddressModalMode(null);
          setSelectedAddress(null);
        }}
        addressModalMode={addressModalMode}
        setAddressList={setAddressList}
        selectedAddress={selectedAddress}
      />

      <ModalConfirm
        isOpen={openModalConfirm}
        setOpen={setOpenModalConfirm}
        type="warning"
        toggle={() => setOpenModalConfirm(false)}
        text="Are you sure you want to delete this address?"
        handleConfirm={() => setConfirmDelete(true)}
      />
    </Grid>
  );
};

export default Address;
