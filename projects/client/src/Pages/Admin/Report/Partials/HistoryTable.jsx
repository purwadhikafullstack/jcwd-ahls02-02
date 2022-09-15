import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
} from "@mui/material";
import Text from "../../../../Components/atoms/Text";

const HistoryTable = (props) => {
  const { productData, totalPage, changePage, page, setPage, handleOpenEdit } =
    props;
  console.log(productData);

  const test = [1, 2, 3];
  return (
    <>
      <Box sx={{ pl: 3, display: { xs: "block", md: "block" } }}>
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
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {test.length
                ? // ? productData.length > 0
                  productData.map((data, index) => (
                    <TableRow
                      key={index + 1}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {index + 1}
                      </TableCell>
                      <TableCell align="center">date</TableCell>
                      <TableCell align="center">product name</TableCell>
                      <TableCell align="center">unit</TableCell>
                      <TableCell align="center">{10}</TableCell>
                      <TableCell align="center">Rp</TableCell>
                    </TableRow>
                  ))
                : // : null
                  null}
            </TableBody>
          </Table>
        </TableContainer>
        {productData ? (
          productData.length === 0 ? (
            <Box
              fullWidth
              display="flex"
              sx={{ justifyContent: "center", my: 2 }}
            >
              <Text>No Data Found</Text>
            </Box>
          ) : null
        ) : null}
        <Box textAlign="right" sx={{ display: "flex" }}>
          {productData ? (
            productData.length > 0 ? (
              <Pagination
                count={totalPage}
                page={page}
                color="primary"
                // onChange={clickPage}
              />
            ) : null
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default HistoryTable;
