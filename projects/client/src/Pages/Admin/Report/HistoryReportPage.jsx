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
import Cookies from "js-cookie";

const HistoryReportPage = () => {
  const [historyData, setHistoryData] = useState();
  const [productData, setProductData] = useState();

  const [selectedProduct, setSelectedProduct] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState(`sort=created_at&order=asc`);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [limit, setLimit] = useState(10);

  const getStockHistoryData = async (
    filterProduct = selectedProduct,
    filterStartDate = startDate,
    filterEndDate = endDate,
    querySort = sortBy,
    queryPage = currentPage,
    queryLimit = limit
  ) => {
    try {
      let query = "";
      if (filterProduct) {
        if (query) {
          query += `&product_id=${filterProduct}`;
        } else {
          query += `?product_id=${filterProduct}`;
        }
      }
      if (filterStartDate) {
        if (query) {
          query += `&start_date=${filterStartDate}`;
        } else {
          query += `?start_date=${filterStartDate}`;
        }
      }
      if (filterEndDate) {
        if (query) {
          query += `&end_date=${filterEndDate}`;
        } else {
          query += `?end_date=${filterEndDate}`;
        }
      }
      if (querySort) {
        if (query) {
          query += `&${querySort}`;
        } else {
          query += `?${querySort}`;
        }
      }
      if (queryPage) {
        if (query) {
          query += `&page=${queryPage}`;
        } else {
          query += `?page=${queryPage}`;
        }
      }

      if (queryLimit) {
        if (query) {
          query += `&limit=${queryLimit}`;
        } else {
          query += `?limit=${queryLimit}`;
        }
      }

      const token = Cookies.get("userToken");
      const res = await axios.get(`${API_URL}/admin/stock${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setHistoryData(res.data.data);
        setTotalPage(res.data.totalPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // data for filter selection
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

  useEffect(() => {
    getProductData();
    getStockHistoryData();
  }, []);
  useEffect(() => {
    getStockHistoryData();
  }, [limit, sortBy, currentPage]);

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
              <HistoryTable
                historyData={historyData}
                getStockHistoryData={getStockHistoryData}
                sortBy={sortBy}
                setSortBy={setSortBy}
                limit={limit}
                setLimit={setLimit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPage={totalPage}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default HistoryReportPage;
