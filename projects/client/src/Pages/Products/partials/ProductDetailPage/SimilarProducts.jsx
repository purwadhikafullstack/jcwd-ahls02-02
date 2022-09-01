import { Box, Grid } from "@mui/material";
import Text from "../../../../Components/atoms/Text";
import ProductCard from "../../../../Components/ProductCard2";
import { API_IMAGE_URL } from "../../../../helper";
import { useNavigate } from "react-router-dom";

const SimilarProducts = (props) => {
    const { productData } = props
    const navigate = useNavigate();

    return <>
        <Text fontSize='h4' sx={{ textAlign: 'left', mt: 3, mb: 2 }}>
            Similar Products
        </Text>
        <Grid container spacing={2}>
            {productData ? productData.map((value) => {
                return (
                    <Grid item xs={12} sm={3} key={value.id}>
                        <Box>
                            <ProductCard
                                id={value.id}
                                name={value.name}
                                price={value.price}
                                image={`${API_IMAGE_URL}${value.image}`}
                                handleDetail={() => {
                                    navigate(`/product/${value.id}`)
                                    window.location.reload()
                                }}
                            />
                        </Box>
                    </Grid>
                );
            }) : null}
        </Grid>
    </>
}

export default SimilarProducts;