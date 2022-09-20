import axios from "axios"
import { API_IMAGE_URL, API_URL } from "../../helper"
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Box, Card, Container, Divider, Grid, Pagination, Typography } from "@mui/material";
import Button from "../../Components/atoms/Button";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import ModalConfirm from "../../Components/ModalConfirm";
import PrescriptionSidebar from "./partials/PrescriptionSidebar";

const PrescriptionListPage = () => {
    const userData = useSelector((state) => {
        return state.userReducer;
    });

    let [prescriptionList, setPrescriptionList] = useState()
    let [openConfirm, setOpenConfirm] = useState(false)
    let [orderId, setOrderId] = useState()
    let [page, setPage] = useState(1)
    let [limit, setLimit] = useState(5)
    let [totalPage, setTotalPage] = useState()

    let [selectedTab, setSelectedTab] = useState()
    let [selectedStatus, setSelectedStatus] = useState("")

    useEffect(() => {
        getData();
    }, [selectedStatus])

    const getData = async (currentPage = page, currentLimit = limit, currentStatus = selectedStatus) => {
        try {
            if (currentStatus) {
                let query = ``
                if (currentStatus === 'Validated') {
                    query += `status=Waiting for Payment&status=Processed&status=Sent&status=Completed`
                } else {
                    query += `status=${currentStatus}`
                }
                const data = await axios.get(`${API_URL}/users/prescription/${userData.id}?page=${currentPage}&limit=${currentLimit}&${query}`)
                if (data.data.data.length > 0) {
                    setPrescriptionList(data.data.data)
                    setTotalPage(data.data.totalPage)
                } else {
                    setPrescriptionList()
                }
            } else {
                const data = await axios.get(`${API_URL}/users/prescription/${userData.id}?page=${currentPage}&limit=${currentLimit}`)
                if (data.data.data.length > 0) {
                    setPrescriptionList(data.data.data)
                    setTotalPage(data.data.totalPage)
                } else {
                    setPrescriptionList()
                }

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
        } else if (status === "Cancelled" || status === "Cancelled Prescription") {
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
                                <Button variant="contained" color="error" onClick={() => {
                                    setOrderId(value.id_order)
                                    setOpenConfirm(true)
                                    // cancelOrder(userData.id, value.id_order)

                                }}>Cancel Order</Button>
                                : null}
                        </Box>
                    </Box>
                </Card>
            })
        } else {
            return <Typography sx={{ mt: 5 }}>
                No data found
            </Typography>
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

    const clickPage = (event, value) => {
        console.log(value)
        setPage(value)
        getData(value, limit)
    }

    return <div style={{ paddingBottom: '5rem' }}>
        <Container>
            <Grid container>
                <Grid item xs={12} md={3}>
                    <PrescriptionSidebar
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                        setSelectedStatus={setSelectedStatus}
                        setCurrentPage={setPage}
                    />
                </Grid>
                <Grid item xs={12} md={9}>
                    {printCard()}
                    <Box display="flex" sx={{ justifyContent: "flex-end" }}>
                        {prescriptionList ?
                            <Pagination count={totalPage} color='primary' onChange={clickPage} />
                            : null}
                    </Box>
                </Grid>
            </Grid>
            <ModalConfirm
                isOpen={openConfirm}
                toggle={() => setOpenConfirm(!openConfirm)}
                text='Are you sure you want to cancel this order?'
                type='warning'
                handleConfirm={() => cancelOrder(userData.id, orderId)}
            />
        </Container>
    </div>
}

export default PrescriptionListPage;