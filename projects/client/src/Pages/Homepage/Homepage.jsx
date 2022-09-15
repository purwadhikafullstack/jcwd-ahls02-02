import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Banner from "./Partials/Banner";
import CategoryShop from "./Partials/CategoryShop";
import ProductCard from "../../Components/ProductCard2";

let dataProduct = [
    {
        id: 1,
        name: "Obat A",
        image: "https://d2qjkwm11akmwu.cloudfront.net/products/737180_22-9-2021_10-30-30.png",
        price: 12000
    },
    {
        id: 2,
        name: "Obat B",
        image: "https://d2qjkwm11akmwu.cloudfront.net/products/679394_24-3-2019_23-22-7.jpg",
        price: 13000
    },
    {
        id: 3,
        name: "Obat C",
        image: "https://d2qjkwm11akmwu.cloudfront.net/products/317428_22-9-2021_10-57-22.png",
        price: 14000
    },
    {
        id: 4,
        name: "Obat D",
        image: "https://cdn-cas.orami.co.id/parenting/images/tremenza.width-800.jpg",
        price: 15000
    }
]

const Homepage = () => {
    return <div>
        <Box sx={{ mb: 3 }}>
            <Banner />
        </Box>
        <CategoryShop />
        <Container sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center', mt: 5 }}>
            {/* <Grid container>
                <Grid item xs={12}> */}
            <Typography variant='h6' sx={{ textAlign: 'center', mb: 2 }}>
                Our Most Popular Products
            </Typography>
            {/* </Grid>
            </Grid> */}
        </Container>
        <Container sx={{ display: { xs: 'none', md: 'flex' }, mt: 5 }}>
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
        <Container>
            <Grid container spacing={2}>
                {dataProduct.map((value) => {
                    return (
                        <Grid item xs={12} sm={3} key={value.id}>
                            <Box>
                                <ProductCard
                                    id={value.id}
                                    name={value.name}
                                    price={value.price}
                                    image={value.image}
                                />
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
        <Container sx={{ mt: 2 }}>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
                <Button>
                    See All Product
                </Button>
            </Box>
        </Container>
    </div>
}

export default Homepage;