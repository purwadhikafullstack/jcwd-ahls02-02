import { Card, Box, Divider, Select, MenuItem, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Text from "../../../Components/atoms/Text";
import { API_URL } from "../../../helper";

const ShippingMethod = (props) => {
  const {
    selectedAddress,
    shippingMethod,
    setShippingMethod,
    setShippingPrice,
  } = props;
  const [selectedCourier, setSelectedCourier] = useState("");
  const [isLoadingService, setIsLoadingService] = useState(false);
  const [serviceOption, setServiceOption] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  const originAddress = {
    province_id: 6,
    province_label: "DKI Jakarta",
    city: {
      id: 152,
      type: "Kota",
      city_name: "Jakarta Pusat",
      postal_code: 10540,
    },
  };

  useEffect(() => {
    setSelectedCourier(null);
    setSelectedService("");
    setServiceOption(null);
    setSelectedService(null);
  }, [selectedAddress]);

  const handleChangeCourier = async (value) => {
    try {
      setSelectedCourier(value);
      setIsLoadingService(true);

      setSelectedService("");
      setShippingPrice(0);

      const shippingData = {
        origin: originAddress.city.id,
        destination: selectedAddress.city_id,
        weight: 1000,
        courier: value,
      };
      const res = await axios.post(`${API_URL}/rajaOngkir/cost`, shippingData);
      if (res.statusText === "OK") {
        setServiceOption(res.data.rajaongkir.results[0].costs);
        setIsLoadingService(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoadingService(false);
      toast.error("Something went wrong, please try again");
    }
  };

  const handleChangeService = (value) => {
    let tempSelectedService;
    serviceOption.forEach((optionValue, index) => {
      if (optionValue.service === value) {
        tempSelectedService = optionValue;
      }
    });
    setSelectedService(tempSelectedService);
    setShippingPrice(tempSelectedService.cost[0].value);
    setShippingMethod({
      courier: selectedCourier.toUpperCase(),
      service: tempSelectedService,
    });
  };

  return (
    <>
      <Card variant="outlined" sx={{ p: 2, height: "225px" }}>
        <Box>
          <Text fontSize="h6" fontWeight="bold">
            Shipping Method
          </Text>
        </Box>
        <Divider />
        <Box alignItems="center" textAlign="left" sx={{ p: 2 }}>
          {selectedAddress && (
            <>
              <Grid container alignItems="center">
                <Grid item xs={3}>
                  <Text>Courier</Text>
                </Grid>
                <Grid item xs={9}>
                  <Select
                    onChange={(e) => handleChangeCourier(e.target.value)}
                    defaultValue=""
                    name="courier"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                    fullWidth
                    disabled={!selectedAddress}
                  >
                    <MenuItem value="" disabled>
                      Choose shipping courier
                    </MenuItem>
                    <MenuItem value={"jne"}>JNE</MenuItem>
                    <MenuItem value={"pos"}>POS Indonesia</MenuItem>
                    <MenuItem value={"tiki"}>Tiki</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </>
          )}
          {selectedCourier && (
            <>
              {!isLoadingService ? (
                <>
                  <Grid container alignItems="center" sx={{ pt: 1 }}>
                    <Grid item xs={3}>
                      Service
                    </Grid>
                    <Grid item xs={9}>
                      <Select
                        onChange={(e) => handleChangeService(e.target.value)}
                        defaultValue=""
                        name="courier"
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                        fullWidth
                        disabled={!selectedAddress}
                      >
                        <MenuItem value="" disabled>
                          Choose service type
                        </MenuItem>
                        {serviceOption?.map((value) => {
                          return (
                            <MenuItem value={value.service}>
                              {value.description} ({value.service})
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </Grid>
                    {selectedService && (
                      <Grid container>
                        <Grid item xs={3} />
                        <Grid item xs={9} sx={{ pl: 1, pt: 1 }}>
                          <Text>
                            Cost: IDR{" "}
                            {selectedService?.cost[0].value.toLocaleString()}
                          </Text>
                          <Text>
                            ETA: {selectedService?.cost[0].etd.split(" ")[0]}{" "}
                            Day(s)
                          </Text>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </>
              ) : (
                <Box>
                  <Text textAlign="center" sx={{ pt: 1 }}>
                    Loading...
                  </Text>
                </Box>
              )}
            </>
          )}
        </Box>
      </Card>
    </>
  );
};

export default ShippingMethod;
