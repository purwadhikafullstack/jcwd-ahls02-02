import { Box, Pagination, Grid } from "@mui/material";
import ProductCard from "../../../../Components/ProductCard2";
import { API_IMAGE_URL } from "../../../../helper";
import { useNavigate } from "react-router-dom";
import Text from "../../../../Components/atoms/Text";

const ProductCards = (props) => {
  const { productData, totalPage, changePage, page } = props;
  const navigate = useNavigate();

  const clickPage = (event, value) => {
    changePage(value);
  };

  const printCards = () => {
    return (
      <Grid container spacing={2}>
        {productData.length > 0 ? productData.map((value, index) => {
          return (
            <Grid item xs={12} sm={3} key={`pd-${index}`}>
              <Box>
                <ProductCard
                  id={value.id}
                  name={value.name}
                  price={value.price}
                  image={`${API_IMAGE_URL}${value.image}`}
                  quantity={value.quantity}
                  handleDetail={() => navigate(`/product/${value.id}`)}
                  needs_receipt={value.needs_receipt}
                />
              </Box>
            </Grid>
          );
        }) :
          <Grid item xs={12} display="flex" sx={{ justifyContent: 'center' }}>
            <Box>
              <Text>No Data Found</Text>
            </Box>
          </Grid>
        }
      </Grid>
    );
  };

  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, pb: 3 }}>
      <Box sx={{ minHeight: "100vh" }}>{printCards()}</Box>
      <Box textAlign="right" sx={{ display: "flex" }}>
        {totalPage.length > 0 ? (
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
