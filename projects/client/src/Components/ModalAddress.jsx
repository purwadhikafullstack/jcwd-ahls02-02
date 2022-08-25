import {
  Modal,
  Backdrop,
  Fade,
  Box,
  TextField,
  FormControl,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { API_URL } from "../helper";
import Button from "./atoms/Button";
import Text from "./atoms/Text";
import { useDispatch, useSelector } from "react-redux";
import { ToastNotification } from "./Toast";
import toast from "react-hot-toast";
import { editProfileAction } from "../Redux/Actions/userAction";
import ModalConfirm from "./ModalConfirm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalAddress = (props) => {
  const { isOpen, toggle, addressModalMode, setAddressList, selectedAddress } =
    props;
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setStreet(null);
    setProvince(null);
    setCity(null);
    setPostalCode(null);
    toggle();
  };

  const user = useSelector((state) => {
    return state.userReducer;
  });

  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [provinceOption, setProvinceOption] = useState([""]);
  const [cityOption, setCityOption] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [isLoadingPostalCode, setIsLoadingPostalCode] = useState(false);

  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  const handleChangeProvince = async (value) => {
    setProvince(value);
    setCity(null);
    setPostalCode(null);
    setIsLoadingCity(true);
    const resCity = await axios.get(
      `${API_URL}/rajaOngkir/city?province=${value}`
    );
    setCityOption(resCity.data.rajaongkir.results);
    setIsLoadingCity(false);
  };

  const handleChangeCity = async (value) => {
    setCity(value);
    setIsLoadingPostalCode(true);
    const resPostalCode = await axios.get(
      `${API_URL}/rajaOngkir/city?id=${value}`
    );
    setPostalCode(resPostalCode.data.rajaongkir.results.postal_code);
    setIsLoadingPostalCode(false);
  };

  useEffect(() => {
    const getProvinceOption = async () => {
      const resProvince = await axios.get(`${API_URL}/rajaOngkir/province`);
      setProvinceOption(resProvince.data.rajaongkir.results);
    };
    const getCityOption = async (provinceId) => {
      const resCity = await axios.get(
        `${API_URL}/rajaOngkir/city?province=${provinceId}`
      );
      setCityOption(resCity.data.rajaongkir.results);
    };

    if (selectedAddress) {
      const { addressValue } = selectedAddress;
      setPostalCode(addressValue.postal_code);
      setStreet(addressValue.street);
      setProvince(addressValue.province_id.toString());
      setCity(addressValue.city_id.toString());
      getCityOption(addressValue.province_id);
    }

    getProvinceOption();
    setIsLoading(false)
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      let provinceLabel;
      let cityLabel;
      cityOption.forEach((value, index) => {
        if (value.city_id === city) {
          provinceLabel = value.province;
          cityLabel = value.type + " " + value.city_name;
        }
      });
      const data = {
        street,
        province_id: parseInt(province),
        province_label: provinceLabel,
        city_id: parseInt(city),
        city_label: cityLabel,
        postal_code: parseInt(postalCode),
      };

      const token = Cookies.get("userToken");
      let res;

      if (addressModalMode === "Add") {
        res = await axios.post(
          `${API_URL}/users/profile/address/${user.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (addressModalMode === "Edit") {
        data.addressId = selectedAddress.addressValue.id;
        res = await axios.patch(
          `${API_URL}/users/profile/address/${user.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      console.log(res)
      if (res.data.success) {
        dispatch(editProfileAction({ address: res.data.data }));
        setAddressList(res.data.data);
        toggle();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Please try again");
    }
  };

  useEffect(() => {
    if (confirmSubmit) {
      handleSubmit();
      setConfirmSubmit(false);
    }
  }, [confirmSubmit]);

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
          <ToastNotification />
          <Box sx={{ pb: 3 }}>
            <Text fontSize="h5" fontWeight="bold" color="primary">
              {addressModalMode === "Add" ? "Add New Address" : "Edit Address"}
            </Text>
          </Box>
          <FormControl fullWidth>
            {!isLoading && (
              <>
                <Box sx={{ py: 1 }}>
                  <TextField
                    fullWidth
                    required
                    id="street-form"
                    label="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  ></TextField>
                </Box>

                <Box sx={{ py: 1 }}>
                  <TextField
                    fullWidth
                    required
                    select
                    id="select-province"
                    label="Province"
                    value={province}
                    onChange={(e) => handleChangeProvince(e.target.value)}
                  >
                    <MenuItem value="" disabled>
                      Choose Province
                    </MenuItem>
                    {provinceOption.map((value, index) => {
                      return (
                        <MenuItem value={value.province_id}>
                          {value.province}
                        </MenuItem>
                      );
                    })}
                  </TextField>
                </Box>
                {province && (
                  <>
                    {!isLoadingCity ? (
                      <>
                        <Box sx={{ py: 1 }}>
                          <TextField
                            fullWidth
                            required
                            select
                            id="select-city"
                            label="City"
                            value={city}
                            onChange={(e) => handleChangeCity(e.target.value)}
                          >
                            <MenuItem value="" disabled>
                              Choose City
                            </MenuItem>
                            {cityOption.map((value, index) => {
                              return (
                                <MenuItem value={value.city_id}>
                                  {value.type} {value.city_name}
                                </MenuItem>
                              );
                            })}
                          </TextField>
                        </Box>
                        {city && (
                          <>
                            {!isLoadingPostalCode ? (
                              <>
                                <Box sx={{ py: 1 }}>
                                  <TextField
                                    fullWidth
                                    required
                                    disabled
                                    id="select-postal-code"
                                    label="postal-code"
                                    value={postalCode}
                                  />
                                </Box>
                              </>
                            ) : (
                              <Box sx={{ py: 1 }}>Loading....</Box>
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <Box sx={{ py: 1 }}>Loading....</Box>
                    )}
                  </>
                )}

                <Box sx={{ display: "flex", justifyContent: "end", pt: 1 }}>
                  <Button
                    variant="outlined"
                    color="error"
                    width="100px"
                    sx={{ mr: 2 }}
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    width="100px"
                    onClick={()=>setOpenModalConfirm(true)}
                  >
                    Submit
                  </Button>
                </Box>
              </>
            )}
          </FormControl>
          <ModalConfirm
            isOpen={openModalConfirm}
            setOpen={setOpenModalConfirm}
            type="confirm"
            toggle={() => setOpenModalConfirm(false)}
            text={
              addressModalMode === "Add"
                ? "Are you sure you want to add this address?"
                : "Are you sure you want to change this address?"
            }
            handleConfirm={() => setConfirmSubmit(true)}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalAddress;
