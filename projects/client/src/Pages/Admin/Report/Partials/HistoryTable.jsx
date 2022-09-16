import { HelpOutline } from "@mui/icons-material";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Pagination,
  Select,
  MenuItem,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Text from "../../../../Components/atoms/Text";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const HistoryTable = (props) => {
  const {
    historyData,
    totalPage,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    limit,
    setLimit,
  } = props;

  const handleChangeSort = (sortValue) => {
    setCurrentPage(1);
    setSortBy(sortValue);
  };

  const handleChangeLimit = (limitValue) => {
    setCurrentPage(1);
    setLimit(limitValue);
  };

  const handleClickPage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Box sx={{ pl: { xs: 0, md: 3 }, display: { xs: "block", md: "block" } }}>
        <Grid
          container
          sx={{
            alignItems: "center",
            p: { sm: 2 },
            px: 2,
            pt: 2,
          }}
        >
          <Grid item xs={12} sm={6} sx={{ order: { xs: 2, sm: 1 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                pt: { xs: 1 },
              }}
            >
              <Select
                defaultValue={limit}
                onChange={(e) => handleChangeLimit(e.target.value)}
                size="small"
                sx={{ width: "40px" }}
                IconComponent={null}
                inputProps={{ sx: { px: "0 !important" } }}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
              <Text sx={{ pl: 1 }}>per Page</Text>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ order: { xs: 1, sm: 2 } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
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
                <MenuItem value={`sort=created_at&order=asc`}>
                  Date Asc
                </MenuItem>
                <MenuItem value={`sort=created_at&order=desc`}>
                  Date Desc
                </MenuItem>
              </Select>
            </Box>
          </Grid>
        </Grid>
        <TableContainer>
          <Table
            sx={{ minWidth: 650, overflow: "auto" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  No
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Date
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Product Name
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Unit
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Quantity
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }} align="center">
                  Type
                  <HtmlTooltip
                    title={
                      <Box>
                        <ul>
                          <li>Stock Update</li>
                          <li>Sales</li>
                          <li>Unit Conversion</li>
                          <li>Returned Order</li>
                        </ul>
                      </Box>
                    }
                  >
                    <HelpOutline fontSize="h6" />
                  </HtmlTooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyData &&
                historyData.map((value, index) => (
                  <TableRow
                    key={index + 1}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {(currentPage-1)*limit+(index + 1)}
                    </TableCell>
                    <TableCell align="center">
                      {value.created_at.substring(0, 10)}
                    </TableCell>
                    <TableCell align="center">{value.name}</TableCell>
                    <TableCell align="center">
                      <Text
                        textAlign="center"
                        color={value.quantity < 0 ? "error" : "primary"}
                      >
                        {value.quantity}
                      </Text>
                    </TableCell>
                    <TableCell align="center">{value.unit}</TableCell>
                    <TableCell align="center">{value.type}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!historyData && (
          <Box
            fullWidth
            display="flex"
            sx={{ justifyContent: "center", my: 2 }}
          >
            <Text>No Data Found</Text>
          </Box>
        )}
        {totalPage > 1 && (
          <Box sx={{ pr: 2, display: "flex", justifyContent: "flex-end" }}>
            <Pagination
              count={totalPage}
              page={currentPage}
              color="primary"
              onChange={handleClickPage}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default HistoryTable;
