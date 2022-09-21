import { Box, Button, Container, Grid, Typography } from "@mui/material";
import Banner from "./Partials/Banner";
import CategoryShop from "./Partials/CategoryShop";
import ProductCard from "../../Components/ProductCard2";
import { useDispatch, useSelector } from 'react-redux'
import Cookies from "js-cookie";
import axios from "axios";
import { API_IMAGE_URL, API_URL } from "../../helper";
import { getCartAction } from "../../Redux/Actions/userAction";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();

    const { idUser, status, cart } = useSelector((state) => {
        return {
            idUser: state.userReducer.id,
            status: state.userReducer.verified_status,
            cart: state.userReducer.cart
        }
    })

    const [dataProduct, setDataProduct] = useState()

    const dispatch = useDispatch();

    useEffect(() => {
        getCartData();
        getPopularProduct();
    }, [])

    const getCartData = async () => {
        try {
            const token = Cookies.get("userToken");
            const res = await axios.get(`${API_URL}/users/cart/${idUser}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success && res.data.data) {
                const resDataData = res.data.data;
                dispatch(getCartAction(resDataData));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getPopularProduct = async () => {
        try {
            const res = await axios.get(`${API_URL}/products/popular`);
            if (res.data.success && res.data.data) {
                setDataProduct(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDetail = (idProduct) => {
        navigate(`/product/${idProduct}`)
    }

    return <div style={{ paddingBottom: '5rem' }}>
        <Box sx={{ mb: 3 }}>
            <Banner
                idUser={idUser}
            />
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
                        <Button onClick={()=>navigate(`/product`)}>
                            See All Product
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
        <Container>
            <Grid container spacing={2}>
                {dataProduct ? dataProduct.map((value) => {
                    return (
                        <Grid item xs={12} sm={3} key={value.id}>
                            <Box>
                                <ProductCard
                                    id={value.id}
                                    name={value.name}
                                    price={value.price}
                                    image={`${API_IMAGE_URL}${value.image}`}
                                    quantity={value.quantity}
                                    handleDetail={handleDetail}
                                />
                            </Box>
                        </Grid>
                    )
                }) : null}
            </Grid>
        </Container>
        <Container sx={{ mt: 2 }}>
            <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: 'center' }}>
                <Button onClick={()=>navigate(`/product`)}>
                    See All Product
                </Button>
            </Box>
        </Container>
    </div>
}

export default Homepage;