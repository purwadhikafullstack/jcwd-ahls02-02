import { Card, Container, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../../helper";
import Button from "../../../Components/atoms/Button";
import Text from "../../../Components/atoms/Text";
import { useNavigate } from "react-router-dom";


const CategoryShop = () => {
    const [category, setCategory] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        getCategory();
    }, [])

    const getCategory = () => {
        axios.get(`${API_URL}/products/categories`)
            .then((response) => {
                setCategory(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleNavigate = (id_category) => {
        navigate({
            pathname: '/product',
            search: `?id_category=${id_category}`
        })
    }

    return <div>
        {category ?
            <Container>
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>
                        Shop By Category
                    </Typography>
                    <Grid container>
                        {category.map((value, index) => {
                            return <Grid item xs={12} sx={{ pt: 1 }} key={`c-${index}`}>
                                <Button size='small' variant='outlined' sx={{ width: '100%' }} onClick={() => handleNavigate(value.id)}>
                                    <Text sx={{ textAlign: 'center' }}>
                                        {value.category_name.toUpperCase()}
                                    </Text>
                                </Button>
                            </Grid>
                        })}
                    </Grid>
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Typography variant='h4' sx={{ textAlign: 'left' }}>
                        Shop By Category
                    </Typography>
                    <Grid container sx={{ mt: 2 }}>
                        {category.map((value, index) => {
                            if (index < 4) {
                                return <Grid item md={3} sx={{ pt: 1, pr: 1 }} key={`cm-${index}`}>
                                    <Button variant='outlined' sx={{ height: 80, width: '100%' }} onClick={() => handleNavigate(value.id)}>
                                        <Text sx={{ textAlign: 'center' }}>
                                            {value.category_name.toUpperCase()}
                                        </Text>
                                    </Button>
                                </Grid>
                            }
                        })}
                    </Grid>
                </Box>
            </Container>
            : null}
    </div>
}

export default CategoryShop;