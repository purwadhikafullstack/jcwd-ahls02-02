import { Box, Container, Divider, Grid } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../../Components/atoms/Button";
import Text from "../../../Components/atoms/Text";
import { API_URL } from "../../../helper";
import HistoryFilter from "./Partials/HistoryFilter";
import HistoryTable from "./Partials/HistoryTable";

const HistoryReportPage = () => {
  const [historyData, setHistoryData] = useState();
  const [productData, setProductData] = useState();

  const [selectedProduct, setSelectedProduct] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [limit, setLimit] = useState(10);

  const getStockHistoryData = (
    filterProduct = selectedProduct,
    filterStartDate = startDate,
    filterEndDate = endDate,
    querySort = sortBy,
    queryPage = currentPage,
    queryLimit = limit
  ) => {};

  const getProductData = async () => {
    try {
      const res = await axios.get(`${API_URL}/products/all`);
      if (res.data.length) {
        setProductData(res.data);
        setIsLoading(false);
      } else {
        toast.error("Something went wrong. Please try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again");
    }
  };

  const getInitialData = async () => {
    await getProductData();
  };

  useEffect(() => {
    getProductData();
    // getInitialData();
  }, []);

  return (
    <Container>
      {!isLoading && (
        <Box sx={{ p: 2 }}>
          <Grid container>
            <Grid item xs={12} md={3}>
              <HistoryFilter
                productData={productData}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                getStockHistoryData={getStockHistoryData}
                setCurrentPage={setCurrentPage}
              />
            </Grid>
            <Grid item xs={12} md={9}>
              <Box sx={{ pb: 2 }}>
                <Text fontSize="h5" fontWeight="bold">
                  Stock History Report
                </Text>
              </Box>
              <HistoryTable productData={productData} />
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default HistoryReportPage;
