import { Button, Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";

const ProductCard = (props) => {
    const { data } = props

    return <Container>
        {data ?
            <Grid container spacing={2}>
                {data.map((value, index) => {
                    return <Grid item xs={4} md={2}>

                        <Card>
                            <CardMedia
                                component="img"
                                alt={value.product}
                                height="150"
                                image={value.image}
                            />
                            <CardContent>
                                <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>
                                    {value.product.toUpperCase()}
                                </Typography>
                                <Typography variant="body2" color='grey.600' sx={{ textAlign: 'left' }}>
                                    IDR {value.price.toLocaleString()}
                                </Typography>
                                <Button variant='contained' sx={{ width: '100%', mt: 2 }}>Detail</Button>
                            </CardContent>

                        </Card>
                    </Grid>
                })}
            </Grid>
            : null}
    </Container>
}

export default ProductCard;