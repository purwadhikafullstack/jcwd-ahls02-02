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
import SalesReportFilter from "./Partials/SalesReportFilter";
import SalesReportSidebar from "./Partials/SalesReportSidebar";
import SalesReportTable from "./Partials/SalesReportTable";

const SalesReportPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [salesData, setSalesData] = useState();
  const [productData, setProductData] = useState();

  const [selectedType, setSelectedType] = useState("Transaction"); // transaction, user, product
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState(`sort=created_at&order=asc`);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState("");
  const [limit, setLimit] = useState(10);

  const convertDateToString = (fullDate) => {
    const year = `${fullDate.$y}`;
    const month = `0${1 + fullDate.$M}`.slice(-2);
    const date = `0${fullDate.$D}`.slice(-2);
    return `${year}-${month}-${date}`;
  };

  const getSalesReportData = async (
    filterType = selectedType,
    filterStartDate = startDate,
    filterEndDate = endDate,
    querySort = sortBy,
    queryPage = currentPage,
    queryLimit = limit
  ) => {
    try {
      if (startDate !== null && typeof filterStartDate === "object") {
        filterStartDate = convertDateToString(filterStartDate);
      }
      if (endDate !== null && typeof filterEndDate === "object") {
        filterEndDate = convertDateToString(filterEndDate.add(1,"day"));
      }
      
      let query = "";
      if (filterType) {
        if (query) {
          query += `&type=${filterType}`;
        } else {
          query += `?type=${filterType}`;
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
      const res = await axios.get(`${API_URL}/admin/sales${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setSalesData(res.data.data);
        setTotalPage(res.data.totalPage);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
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
    getSalesReportData();
  }, []);
  useEffect(() => {
    getSalesReportData();
  }, [limit, sortBy, currentPage, selectedType]);

  return (
    <Container>
      {!isLoading && (
        <Box>
          <Grid container>
            <Grid item xs={12} md={3} sx={{ p: 1 }}>
              <SalesReportSidebar
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                setSelectedType={setSelectedType}
                setCurrentPage={setCurrentPage}
              />
            </Grid>
            <Grid item xs={12} md={9} container>
              <Grid item xs={12} sx={{ pt: 2 }}>
                <Divider />
                <SalesReportFilter
                  productData={productData}
                  selectedType={selectedType}
                  setSelectedType={setSelectedType}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  getSalesReportData={getSalesReportData}
                  setCurrentPage={setCurrentPage}
                />
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <SalesReportTable
                  salesData={salesData}
                  getSalesReportData={getSalesReportData}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  limit={limit}
                  setLimit={setLimit}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPage={totalPage}
                  selectedType={selectedType}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default SalesReportPage;
