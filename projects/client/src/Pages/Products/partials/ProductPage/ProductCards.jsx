import { Box, Pagination, Grid } from "@mui/material";
import ProductCard from "../../../../Components/ProductCard2";
import { API_URL } from "../../../../helper";

const ProductCards = (props) => {
  const { productData, totalPage, changePage, page } = props;
  const clickPage = (event, value) => {
    changePage(value);
  };

  const printCards = () => {
    return (
      <Grid container spacing={2}>
        {productData.map((value) => {
          return (
            <Grid item xs={12} sm={3}>
              <Box>
                <ProductCard
                  id={value.id}
                  name={value.name}
                  price={value.price}
                  image={`${API_URL}${value.image}`}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, pb: 3 }}>
      <Box sx={{ minHeight: "100vh" }}>{printCards()}</Box>
      <Box textAlign="right" sx={{ display: "flex" }}>
        {totalPage ? (
          <Pagination
            count={totalPage}
            defaultPage={page}
            color="primary"
            onChange={clickPage}
            sx={{ py: 4 }}
          />
        ) : null}
      </Box>
    </Box>
  );
};

export default ProductCards;
