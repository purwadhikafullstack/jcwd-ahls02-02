import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import Button from "../../../../Components/atoms/Button";
import Text from "../../../../Components/atoms/Text";

const HistoryFilter = (props) => {
  const {
    productData,
    selectedProduct,
    setSelectedProduct,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    getStockHistoryData,
    setCurrentPage,
  } = props;

  const convertDateToString = (fullDate) => {
    const year = `${fullDate.$y}`;
    const month = `0${1 + fullDate.$M}`.slice(-2);
    const date = `0${fullDate.$D}`.slice(-2);
    return `${year}-${month}-${date}`;
  };

  const handleSubmit = () => {
    setCurrentPage(1);
    let tempStartDate = startDate && convertDateToString(startDate);
    let tempEndDate = endDate && convertDateToString(endDate);
    getStockHistoryData(selectedProduct, tempStartDate, tempEndDate);
  };

  const handleReset = () => {
    setSelectedProduct("");
    setStartDate(null);
    setEndDate(null);
    setCurrentPage(1);
    getStockHistoryData("", "", "");
  };

  return (
    <Box sx={{ p: 1 }}>
      {/* <Accordion sx={{ boxShadow: 0 }}> */}
      {/* <AccordionSummary expandIcon={<ExpandMore />}> */}
      {/* <Box sx={{ pt: 2, pb: 1 }}>
        <Text fontSize="h6" fontWeight="bold">
          {" "}
          Filter
        </Text>
      </Box> */}
      {/* </AccordionSummary> */}
      {/* <Divider /> */}
      {/* <AccordionDetails> */}
      <Box sx={{ pb: 2, pt: 1 }}>
        <Grid container alignItems="center">
          <Grid item xs={12} sx={{ p: 1 }} container alignItems="center">
            <Grid item xs={12} sx={{ py: 1 }}>
              <Text textAlign="left" fontSize="h6" fontWeight="bold">
                Product
              </Text>
            </Grid>
            <Grid item xs={12}>
              <Select
                value={selectedProduct}
                fullWidth
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                }}
                inputProps={{ style: { textAlign: "left" } }}
                displayEmpty
              >
                <MenuItem value={undefined} disabled>
                  Choose One
                </MenuItem>
                <MenuItem value={""}>All Products</MenuItem>
                {productData.map((value) => {
                  return (
                    <MenuItem key={value.id} value={value.id}>
                      {value.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sx={{ px: 1, pb: 1 }}
            container
            alignItems="center"
          >
            <Grid item xs={12} sx={{ py: 1 }}>
              <Text textAlign="left" fontSize="h6" fontWeight="bold">
                Date
              </Text>
            </Grid>
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={startDate}
                    onChange={(newValue) => {
                      setStartDate(newValue);
                    }}
                    maxDate={endDate ? endDate : undefined}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sx={{ py: 1 }}>
                <Text textAlign="center">until</Text>
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={endDate}
                    onChange={(newValue) => {
                      setEndDate(newValue);
                    }}
                    minDate={startDate ? startDate : undefined}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ width:"100%",py: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              width="100%"
              onClick={handleReset}
              sx={{ mb: 1 }}
            >
              Reset
            </Button>
            <Button
              variant="contained"
              color="primary"
              width="100%"
              onClick={handleSubmit}
              sx={{ mb: 1 }}
            >
              Apply
            </Button>
          </Box>

          {/* <Grid container item xs={12} sx={{ p: 1 }}>
            <Grid item xs={0} md={3} />
            <Grid item xs={9} sx={{ display: "flex" }}>
              <Box textAlign="left" sx={{ pr: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  width="100px"
                  onClick={handleSubmit}
                >
                  Apply
                </Button>
              </Box>
              <Box textAlign="left" sx={{ pl: 1 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  width="100px"
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Box>
            </Grid>
          </Grid> */}
        </Grid>
      </Box>
      {/* </AccordionDetails> */}
      {/* </Accordion> */}
      <Divider />
    </Box>
  );
};

export default HistoryFilter;
