import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import Text from "../../../../Components/atoms/Text";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "../../../../Components/atoms/Button";
import { ExpandMore } from "@mui/icons-material";

const OrderFilter = (props) => {
  const {
    invoiceNumber,
    setInvoiceNumber,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    getOrderData,
    setCurrentPage,
  } = props;

  const convertDateToString = (fullDate) => {
    const year = `${fullDate.$y}`;
    const month = `0${1 + fullDate.$M}`.slice(-2);
    const date = `0${fullDate.$D}`.slice(-2);
    return `${year}-${month}-${date}`;
  };

  const handleSubmit = () => {
    setCurrentPage(0);
    let tempStartDate = startDate && convertDateToString(startDate);
    let tempEndDate = endDate && convertDateToString(endDate);
    getOrderData(invoiceNumber, tempStartDate, tempEndDate);
  };

  const handleReset = () => {
    setInvoiceNumber("");
    setStartDate(null);
    setEndDate(null);
    getOrderData("", "", "");
  };

  return (
    <Box>
      <Accordion sx={{ boxShadow: 0 }}>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Text fontSize="h6" fontWeight="bold">
            Filter
          </Text>
        </AccordionSummary>
        <Divider />
        <AccordionDetails>
          <Box>
            <Grid container alignItems="center">
              <Grid item xs={12} sx={{ p: 1 }}>
                <Grid container alignItems="center">
                  <Grid item xs={12} md={3} sx={{ py: { xs: 1, md: 0 } }}>
                    <Text textAlign="left">Invoice Number</Text>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <TextField
                      id="invoice_number"
                      value={invoiceNumber}
                      placeholder="Invoice Number"
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        setInvoiceNumber(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ px: 1, pb: 1 }}>
                <Grid container alignItems="center">
                  <Grid item xs={12} md={3} sx={{ py: { xs: 1, md: 0 } }}>
                    <Text textAlign="left">Date</Text>
                  </Grid>
                  <Grid item xs={12} md={9}>
                    <Grid container alignItems="center">
                      <Grid item xs={5}>
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
                      <Grid item xs={2}>
                        <Text textAlign="center">until</Text>
                      </Grid>
                      <Grid item xs={5}>
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
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ p: 1 }}>
                <Grid container>
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
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default OrderFilter;
