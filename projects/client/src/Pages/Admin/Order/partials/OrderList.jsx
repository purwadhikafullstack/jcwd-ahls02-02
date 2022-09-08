import {
  Box,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import AdminOrderCard from "../../../../Components/AdminOrderCard";
import Text from "../../../../Components/atoms/Text";

const OrderList = (props) => {
  const {
    orderData,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPage,
    limit,
    setLimit,
  } = props;

  const handleChangeSort = (sortValue) => {
    setCurrentPage(0);
    setSortBy(sortValue);
  };

  const handleChangeLimit = (limitValue) => {
    setCurrentPage(0);
    setLimit(limitValue);
  };

  const handleClickPage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Select
            defaultValue={limit}
            onChange={(e) => handleChangeLimit(e.target.value)}
            size="small"
            sx={{ width: "40px" }}
            IconComponent={null}
            inputProps={{ sx: { px: "0 !important" } }}
          >
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
          <Text sx={{ pl: 1 }}>per Page</Text>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Text sx={{ pr: 2 }}>Sort By:</Text>
          <Select
            defaultValue={sortBy}
            onChange={(e) => handleChangeSort(e.target.value)}
            displayEmpty
            size="small"
            sx={{ width: "200px" }}
          >
            <MenuItem value="">
              <Text color="grey.600" textAlign="left">
                None
              </Text>
            </MenuItem>
            <MenuItem value={`sort=invoice_number&order=asc`}>
              Invoice Number (a-z)
            </MenuItem>
            <MenuItem value={`sort=invoice_number&order=desc`}>
              Invoice Number (z-a)
            </MenuItem>
            <MenuItem value={`sort=created_at&order=asc`}>Date Asc</MenuItem>
            <MenuItem value={`sort=created_at&order=desc`}>Date Desc</MenuItem>
          </Select>
        </Box>
      </Box>
      {orderData.map((value, index) => {
        return (
          <Box sx={{ p: 2 }} key={`${value.name}-${index}`}>
            <AdminOrderCard orderData={value} />
          </Box>
        );
      })}
      {totalPage > 1 && (
        <Box>
          <Pagination
            count={totalPage}
            page={currentPage}
            color="primary"
            onChange={handleClickPage}
          />
        </Box>
      )}
    </Box>
  );
};

export default OrderList;
