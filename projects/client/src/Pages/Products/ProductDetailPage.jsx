import axios from 'axios'
import { API_URL, API_IMAGE_URL } from '../../helper'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Box, Button, Container, Grid, IconButton, TextField, Typography } from '@mui/material'
import { Add, DoNotDisturb, FileUpload, Remove, ShoppingCartOutlined } from '@mui/icons-material'
import Text from '../../Components/atoms/Text'
import toast from 'react-hot-toast'
import { ToastNotification } from '../../Components/Toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { editCartAction } from '../../Redux/Actions/userAction'
import SimilarProducts from './partials/ProductDetailPage/SimilarProducts'
import BasicBreadcrumbs from '../../Components/atoms/Breadcrumb'

// const link = [
//     {
//         id: 1,
//         link: 'Home',
//         href: '/'
//     },
//     {
//         id: 2,
//         link: 'Product',
//         href: '/product'
//     }
// ]

const ProductDetailPage = () => {
    let { id } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const { idUser, status, cart } = useSelector((state) => {
        return {
            idUser: state.userReducer.id,
            status: state.userReducer.verified_status,
            cart: state.userReducer.cart
        }
    })

    let [detailProduct, setDetailProduct] = useState()
    let [similarProducts, setSimilarProducts] = useState([])
    let [quantity, setQuantity] = useState(1)
    let [link, setLink] = useState([
        {
            id: 1,
            link: 'Home',
            href: '/'
        },
        {
            id: 2,
            link: 'Product',
            href: '/product'
        }
    ])


    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            let productData = await axios.get(`${API_URL}/products/${id}`)

            if (productData.data.data) {
                let similar = await axios.get(`${API_URL}/products?id_category=${productData.data.data.id_category}&limit=8`)
                setDetailProduct(productData.data.data)
                if (similar.data.product) {
                    let temp = []
                    similar.data.product.forEach(value => {
                        if (value.default_unit === 'true') {
                            console.log('id', value.id)
                            temp.push({ id: value.id, name: value.name, price: value.selling_price, image: value.image, quantity: value.quantity })
                        }
                    })
                    setSimilarProducts(temp)
                }
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
                <Box sx={{ mt: 2 }}>
                    {/* <Box sx={{ display: { xs: 'none', md: 'flex', mt: 2 } }}> */}
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
                                {detailProduct.needs_receipt === 'false' ? detailProduct.quantity < 1 ?
                                    <>
                                        <Button variant='contained' startIcon={<DoNotDisturb />} sx={{ mt: 4 }} disabled>Out Of Stock</Button>
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
                                    :
                                    <>
                                        <Button variant='contained' startIcon={<FileUpload />} sx={{ mt: 2, mb: 1 }} onClick={handleUpload}>Upload Prescription</Button>
                                        <Text fontSize='body2' color='error' sx={{ fontStyle: 'italic' }}>*This product requires a prescription</Text>
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
                    if (cart.length > 0) {
                        let index = cart.findIndex(value => value.id_stock == detailProduct.id_stock)
                        if (index >= 0) {
                            let remainingStock = cart[index].current_stock - cart[index].quantity
                            if (quantity > remainingStock) {
                                toast.error(`Stock is insufficient. You already have some in your cart`)
                            } else {
                                let token = Cookies.get("userToken")
                                let addToCart = await axios.post(`${API_URL}/users/cart/${idUser}`, { id_stock: detailProduct.id_stock, quantity, price: detailProduct.selling_price }, {
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                })
                                if (addToCart) {
                                    toast.success('Added to cart')
                                    dispatch(editCartAction(addToCart.data.data))
                                } else {
                                    toast.error('Something went wrong, please try again')
                                }
                            }
                        } else {
                            let token = Cookies.get("userToken")
                            let addToCart = await axios.post(`${API_URL}/users/cart/${idUser}`, { id_stock: detailProduct.id_stock, quantity, price: detailProduct.selling_price }, {
                                headers: {
                                    'Authorization': `Bearer ${token}`
                                }
                            })
                            if (addToCart) {
                                toast.success('Added to cart')
                                dispatch(editCartAction(addToCart.data.data))
                            } else {
                                toast.error('Something went wrong, please try again')
                            }
                        }
                    } else {
                        let token = Cookies.get("userToken")
                        let addToCart = await axios.post(`${API_URL}/users/cart/${idUser}`, { id_stock: detailProduct.id_stock, quantity, price: detailProduct.selling_price }, {
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        })
                        if (addToCart) {
                            toast.success('Added to cart')
                            dispatch(editCartAction(addToCart.data.data))
                        } else {
                            toast.error('Something went wrong, please try again')
                        }
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



    return <Container sx={{ pt: 3, pb: 5 }}>
        <BasicBreadcrumbs
            prevLinks={link}
            currentLink={detailProduct ? detailProduct.name : null}
        />
        {printProductInfo()}
        <Box sx={{ mt: 10 }}>
            <SimilarProducts
                productData={similarProducts}
            />
        </Box>
        <ToastNotification />
    </Container>
}

export default ProductDetailPage;