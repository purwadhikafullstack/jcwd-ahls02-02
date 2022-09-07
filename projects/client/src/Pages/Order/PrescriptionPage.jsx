import { Box, Card, Container, Divider, Button, Grid } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import BasicBreadcrumbs from "../../Components/atoms/Breadcrumb";
import Text from "../../Components/atoms/Text";
import { API_URL } from "../../helper";
import AddressSelection from "./partials/AddressSelection";
import ShippingMethod from "./partials/ShippingMethod";
import { useNavigate } from 'react-router-dom';

const PrescriptionPage = () => {
    const navigate = useNavigate()
    const [link, setLink] = useState([
        {
            id: 1,
            link: 'Home',
            href: '/'
        },
        {
            id: 2,
            link: 'Prescription',
            href: '/prescription'
        }
    ])
    const userData = useSelector((state) => {
        return state.userReducer;
    });

    const [newDataImage, setNewDataImage] = useState()
    const [newImage, setNewImage] = useState()

    const [addressList, setAddressList] = useState(userData.address);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [shippingMethod, setShippingMethod] = useState(null);
    const [shippingPrice, setShippingPrice] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [idUser, setIdUser] = useState(userData.id)

    useEffect(() => {
        addressList.forEach((value) => {
            if (value.default_address === "true") {
                setSelectedAddress(value);
            }
        });
        setIsLoading(false);
    }, []);

    const handleUpload = (e) => {
        setNewDataImage(e.target.files[0])
        console.log(e.target.files[0])
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            setNewImage(e.target.result)
        }
    }

    const handleSubmit = () => {
        setIsLoading(true)
        let token = Cookies.get("userToken")
        let formData = new FormData();
        let data = {
            selectedAddress,
            shippingPrice,
            shippingMethod
        }

        formData.append('data', JSON.stringify(data))
        formData.append('image', newDataImage)

        axios.post(`${API_URL}/users/prescription/${idUser}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            toast.success('Prescription uploaded')
            setIsLoading(false)
            navigate('/prescription')
        }).catch((error) => {
            console.log(error)
            setIsLoading(false)
        })
    }

    return <Container sx={{ pt: 3 }}>
        <BasicBreadcrumbs
            prevLinks={link}
            currentLink="Upload"
        />
        <Grid container spacing={2} sx={{ pt: 2 }}>
            <Grid item xs={12} md={6}>
                <Card variant="outlined" sx={{ pt: 2, height: "457px" }}>
                    <Container>
                        <Text fontSize="h6" fontWeight="bold">Upload your prescription</Text>
                        <Divider />
                        {newImage ?
                            <Box display="flex" sx={{ flexDirection: "column", alignItems: "center", py: 5 }}>
                                <img src={newImage} alt={`prescription image`} style={{ width: '20%', minWidth: '150px', maxHeight: '500px' }} />
                                <Button onClick={() => setNewImage()} color='error' variant='outlined' sx={{ mt: 2 }}>Remove</Button>
                            </Box>
                            :
                            <Box display="flex" sx={{ flexDirection: "column", alignItems: "center", pt: 10 }}>
                                <img src="https://i.ibb.co/1KJ1bxP/upload.png" alt="upload image" style={{ width: '30%', minWidth: '250px' }} />
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{ mt: 2 }}
                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => handleUpload(e)}
                                    />
                                </Button>
                            </Box>
                        }
                    </Container>
                </Card>
            </Grid>
            <Grid item xs={12} md={6}>
                <Grid container direction="column" spacing={1} >
                    <Grid item>
                        <AddressSelection
                            addressList={addressList}
                            setAddressList={setAddressList}
                            selectedAddress={selectedAddress}
                            setSelectedAddress={setSelectedAddress}
                            setShippingPrice={setShippingPrice}
                        />
                    </Grid>
                    <Grid item>
                        <ShippingMethod
                            selectedAddress={selectedAddress}
                            shippingMethod={shippingMethod}
                            setShippingMethod={setShippingMethod}
                            setShippingPrice={setShippingPrice}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        <Box display="flex" sx={{ justifyContent: "flex-end" }}>
            <Button variant="contained" sx={{ mt: 3 }} onClick={handleSubmit} disabled={shippingMethod && newImage ? isLoading : true}>Process Prescription</Button>
        </Box>
    </Container>
}

export default PrescriptionPage;