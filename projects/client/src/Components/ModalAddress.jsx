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
import { useEffect, useState } from "react";
import { API_URL } from "../helper";
import Button from "./atoms/Button";
import Text from "./atoms/Text";

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
  const { isOpen, toggle, addressModalMode } = props;
  const handleCloseModal = () => {
    setStreet(null);
    setProvince(null);
    setCity(null);
    setPostalCode(null);
    toggle();
  };

  const [street, setStreet] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const [provinceOption, setProvinceOption] = useState([""]);
  const [cityOption, setCityOption] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCity, setIsLoadingCity] = useState(false);
  const [isLoadingPostalCode, setIsLoadingPostalCode] = useState(false);

  const handleChangeProvince = async (value) => {
    setProvince(value);
    setCity(null)
    setPostalCode(null)
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

  const handleSubmit = () => {
    toggle();
  };

  useEffect(() => {
    const getProvinceOption = async () => {
      const resProvince = await axios.get(`${API_URL}/rajaOngkir/province`);
      console.log(resProvince);
      setProvinceOption(resProvince.data.rajaongkir.results);
    };

    getProvinceOption();

    setIsLoading(false);

    if (!province) {
      const getCityOption = async () => {
        const resCity = await axios.get(
          `${API_URL}/rajaOngkir/city?province=${province}`
        );
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (provinceOption.length) {
      setIsLoading(false);
    }
  }, [provinceOption]);

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
                    defaultValue={street}
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
                    defaultValue={province}
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
                            defaultValue={city}
                            onChange={(e) => handleChangeCity(e.target.value)}
                          >
                            <MenuItem value="" disabled>
                              Choose City
                            </MenuItem>
                            {cityOption.map((value, index) => {
                              return (
                                <MenuItem value={value.city_id}>
                                  {value.city_name}
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
                                    defaultValue={postalCode}
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
                    onClick={handleSubmit}
                  >
                    Submit
                  </Button>
                </Box>
              </>
            )}
          </FormControl>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalAddress;
