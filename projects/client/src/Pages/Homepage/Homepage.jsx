import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Banner from "./Partials/Banner";
import CategoryShop from "./Partials/CategoryShop";
import ProductCard from "../../Components/ProductCard";

let dataProduct = [
    {
        id: 1,
        product: "Obat A",
        image: "https://d2qjkwm11akmwu.cloudfront.net/products/737180_22-9-2021_10-30-30.png",
        price: 12000
    },
    {
        id: 2,
        product: "Obat B",
        image: "https://d2qjkwm11akmwu.cloudfront.net/products/679394_24-3-2019_23-22-7.jpg",
        price: 13000
    },
    {
        id: 3,
        product: "Obat C",
        image: "https://d2qjkwm11akmwu.cloudfront.net/products/317428_22-9-2021_10-57-22.png",
        price: 14000
    },
    {
        id: 4,
        product: "Obat D",
        image: "https://cdn-cas.orami.co.id/parenting/images/tremenza.width-800.jpg",
        price: 15000
    },
    {
        id: 5,
        product: "Obat E",
        image: "https://d2qjkwm11akmwu.cloudfront.net/products/267940_20-6-2019_10-38-18.jpg",
        price: 16000
    },
    {
        id: 6,
        product: "Obat F",
        image: "https://www.novapharin.co.id/data/plist_pic/110.jpg",
        price: 17000
    },
]

const Homepage = () => {
    return <div>
        <Banner />
        <CategoryShop />
        <Container sx={{ mt: 5 }}>
            <Grid container>
                <Grid item xs={6}>
                    <Typography variant='h4' sx={{ textAlign: 'left', mb: 2 }}>
                        Our Most Popular Products
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button>
                            See All Product
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        <ProductCard data={dataProduct} />
    </div>
}

export default Homepage;