import axios from "axios"
import { API_IMAGE_URL, API_URL } from "../../../helper"
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Box, Card, Container, Divider, Grid, Typography } from "@mui/material";
import Button from "../../../Components/atoms/Button";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ModalConfirm from "../../../Components/ModalConfirm";
import ModalAddPrescription from "./partials/ModalAddPrescription";

const AdminPrescriptionPage = () => {
    const userData = useSelector((state) => {
        return state.userReducer;
    });

    let [prescriptionList, setPrescriptionList] = useState()
    let [openConfirm, setOpenConfirm] = useState(false)
    let [orderId, setOrderId] = useState()
    let [openModalAdd, setOpenModalAdd] = useState(false)
    let [prescriptionImage, setPrescriptionImage] = useState()

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const data = await axios.get(`${API_URL}/admin/prescription`)
            if (data.data.data.length > 0) {
                setPrescriptionList(data.data.data)
            } else {
                setPrescriptionList()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const printStatus = (status) => {
        if (status === "Waiting for Prescription Validation") {
            return <Typography fontSize='12px' color="secondary" fontWeight="bold" sx={{ m: 1 }}>
                Waiting for Validation
            </Typography>
        } else if (status === "Cancelled") {
            return <Typography fontSize='12px' color="error" fontWeight="bold" sx={{ m: 1 }}>
                Cancelled
            </Typography>
        } else if (status === "Waiting for Payment" || status === "Waiting for Confirmation" || status === "Processed" || status === "Sent" || status === "Completed") {
            return <Typography fontSize='12px' color="primary" fontWeight="bold" sx={{ m: 1 }}>
                Validated
            </Typography>
        } else {
            return <Typography fontSize='12px' color="warning" fontWeight="bold" sx={{ m: 1 }}>
                Error
            </Typography>
        }
    }

    const printCard = () => {
        if (prescriptionList) {
            return prescriptionList.map((value, index) => {
                return <Card key={`p-${index}`} sx={{ my: 2 }}>
                    <Box display="flex" sx={{ flexDirection: 'column' }}>
                        <Box display="flex" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography fontSize='10px' color='grey.600' sx={{ m: 1 }}>
                                INVOICE: {value.invoice_number}
                            </Typography>
                            {printStatus(value.status)}
                        </Box>
                        <Divider sx={{ mx: 1 }} />
                        <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 1, textAlign: 'left' }}>
                            <img src={`${API_IMAGE_URL}/${value.prescription_image}`} style={{ width: 100, height: 100, objectFit: 'cover' }} />
                            <Box display="flex" sx={{ flexDirection: 'column', mx: 2, width: '100%' }}>
                                <Box sx={{ mb: 1 }}>
                                    <Typography fontWeight="bold" variant="subtitle2" component="span">User :</Typography>
                                    <Typography variant="body2" component="span" sx={{
                                        ml: 1,
                                        width: '80%',
                                        whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                    }}>{value.name}</Typography>
                                </Box>
                                <Typography fontWeight="bold" variant="subtitle2">Shipping Address :</Typography>
                                <Typography variant="body2" sx={{
                                    width: '80%',
                                    whiteSpace: "nowrap",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}>{value.shipping_address}</Typography>
                            </Box>
                        </Box>
                        <Divider sx={{ mx: 1 }} />
                        <Box display="flex" sx={{ justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                            <Typography fontSize='10px' color='grey.600'>
                                Upload Date: {value.updated_at.slice(8, 10)} / {value.updated_at.slice(5, 7)} / {value.updated_at.slice(0, 4)}
                            </Typography>
                            {value.status === 'Waiting for Prescription Validation' ?
                                <Box display="flex" sx={{ justifyContent: "flex-end" }}>
                                    <Button variant="outlined" color="error" sx={{ mr: 2 }} onClick={() => {
                                        setOrderId(value.id_order)
                                        setOpenConfirm(true)
                                        // cancelOrder(userData.id, value.id_order)

                                    }}>Cancel Order</Button>
                                    <Button variant="contained" color="primary" onClick={() => {
                                        setOpenModalAdd(true)
                                        setPrescriptionImage(value.prescription_image)
                                    }}>
                                        Submit Order</Button>
                                </Box>
                                : null}
                        </Box>
                    </Box>
                </Card>
            })
        } else {
            return null
        }
    }

    const cancelOrder = async (userId, orderId) => {
        try {
            let token = Cookies.get("userToken")
            let data = {
                order_id: orderId,
                new_status: "Cancelled"
            }

            // let cancel = await axios.patch(`${API_URL}/users/order/${userId}`, data, {
            let cancel = await axios.patch(`${API_URL}/users/order`, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // console.log('cancel', cancel)
            if (cancel.data.success) {
                toast.success('order cancelled')
                getData()
                setOrderId()
            } else {
                toast.error('something went wrong, please try again')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return <Container>
        {printCard()}
        <ModalConfirm
            isOpen={openConfirm}
            toggle={() => setOpenConfirm(!openConfirm)}
            text='Are you sure you want to cancel this order?'
            type='warning'
            handleConfirm={() => cancelOrder(userData.id, orderId)}
        />
        <ModalAddPrescription
            isOpen={openModalAdd}
            toggle={() => setOpenModalAdd(!openModalAdd)}
            image={prescriptionImage}
        />
    </Container>
}

export default AdminPrescriptionPage;