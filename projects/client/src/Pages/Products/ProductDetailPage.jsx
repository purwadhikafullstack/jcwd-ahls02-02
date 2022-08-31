import axios from 'axios'
import { API_URL, API_IMAGE_URL } from '../../helper'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material'
import { Add, FileUpload, Remove, ShoppingCartOutlined } from '@mui/icons-material'
import Text from '../../Components/atoms/Text'
import toast from 'react-hot-toast'
import { ToastNotification } from '../../Components/Toast'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const ProductDetailPage = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const { idUser, status } = useSelector((state) => {
        return {
            idUser: state.userReducer.id,
            status: state.userReducer.verified_status
        }
    })


    let [detailProduct, setDetailProduct] = useState()
    let [quantity, setQuantity] = useState(1)

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            let productData = await axios.get(`${API_URL}/products/${id}`)

            if (productData.data.data) {
                setDetailProduct(productData.data.data)
            } else {
                console.log('Error?')
            }
        } catch (error) {
            if (error.response.data.message === `Product doesn't exist`) {
                console.log(`product gak ada bro`)
            } else if (error.response.data.message === `Params doesn't exist`) {
                console.log(`paramsnya salah bro`)
            } else {
                console.log(error)
            }
        }
    }

    const printProductInfo = () => {
        if (detailProduct) {
            return <>
                {/* <Box sx={{ display: { xs: 'none', md: 'flex' } }}> */}
                <Box>
                    <Grid container>
                        <Grid item md={6}>
                            <Box display='flex' sx={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={`${API_IMAGE_URL}${detailProduct.image}`} alt='product picture' style={{ width: '80%' }} />
                            </Box>
                        </Grid>
                        <Grid item md={6} sx={{ textAlign: 'left' }}>
                            <Box display='flex' sx={{ py: 2, flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                                <Text
                                    fontSize="h5"
                                    fontWeight="bold"
                                    sx={{ mb: 1 }}
                                >{detailProduct.name.toUpperCase()}</Text>
                                <Box display='flex' sx={{ alignItems: 'flex-end', mb: 3 }}>
                                    <Text fontSize='h5' sx={{ mr: 1 }} >Rp. {detailProduct.selling_price.toLocaleString()}</Text>
                                    <Text fontSize='subtitle2' >/ {detailProduct.unit} ({detailProduct.unit_conversion} {detailProduct.smallest_unit})</Text>
                                </Box>
                                <Text fontSize='subtitle2' color='grey.800' textAlign='justify'>{detailProduct.description}</Text>
                                {detailProduct.needs_receipt === 'true' ?
                                    <>
                                        <Button variant='contained' startIcon={<FileUpload />} sx={{ mt: 2, mb: 1 }} onClick={handleUpload}>Upload Prescription</Button>
                                        <Text fontSize='body2' color='error' sx={{ fontStyle: 'italic' }}>*This product requires a prescription</Text>
                                    </>
                                    :
                                    <>
                                        <Box sx={{ display: 'flex', p: 0, mt: 4, alignItems: 'center' }}>
                                            <Box sx={{ mr: 3 }}>
                                                <IconButton onClick={handleDecrement}>
                                                    <Remove />
                                                </IconButton>
                                                <TextField
                                                    size='small'
                                                    onChange={handleQuantity}
                                                    value={quantity}
                                                    type='number'
                                                    sx={{ maxWidth: '50px' }}
                                                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                                                />
                                                <IconButton onClick={handleIncrement}>
                                                    <Add />
                                                </IconButton>
                                            </Box>
                                            <Text fontSize='body2' color={detailProduct.quantity < 10 ? 'error' : 'grey.600'}>Stock: {detailProduct.quantity} left</Text>
                                        </Box>
                                        <Box display='flex' sx={{ mt: 2, mb: 1 }}>
                                            <Button variant='contained' startIcon={<ShoppingCartOutlined />} sx={{ mr: 2 }} onClick={handleAddToCart}>Add to cart</Button>
                                            <Button variant='outlined'>Buy now</Button>
                                        </Box>
                                    </>
                                }
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </>
        } else {
            return null
        }
    }

    const handleIncrement = () => {
        let temp = quantity
        if (temp < detailProduct.quantity) {
            setQuantity(temp += 1)
        } else {
            toast.error(`Stock is insufficient`)
        }
    }

    const handleDecrement = () => {
        let temp = quantity
        if (temp > 1) {
            setQuantity(temp -= 1)
        }
    }

    const handleQuantity = (e) => {
        if (parseInt(e.target.value) > 0 && parseInt(e.target.value) < detailProduct.quantity) {
            setQuantity(parseInt(e.target.value))
        }
    }

    const handleAddToCart = async () => {
        try {
            if (idUser) {
                if (status === 'verified') {
                    let token = Cookies.get("userToken")
                    let addToCart = await axios.post(`${API_URL}/users/cart/${idUser}`, { id_stock: detailProduct.id_stock, quantity }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if (addToCart) {
                        toast.success('Added to cart')
                    } else {
                        toast.error('Something went wrong, please try again')
                    }
                } else {
                    toast.error('Please verify your account first')
                }
            } else {
                navigate('/auth/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpload = () => {
        if (idUser) {
            if (status === 'verified') {
                navigate('/prescription')
            } else {
                toast.error('Please verify your account first')
            }
        } else {
            navigate('/auth/login')
        }
    }



    return <Container sx={{ pt: 3 }}>
        {printProductInfo()}
        <ToastNotification />
    </Container>
}

export default ProductDetailPage;