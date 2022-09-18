import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../helper";
import { Box, Card, CardContent, Container, Divider, Grid, Typography } from "@mui/material";
import Text from "../../Components/atoms/Text";
import Highlight from "./Partials/Highlight";
import Charts from "./Partials/Charts";

const DashboardPage = () => {

    const [todaysProfit, setTodaysProfit] = useState(0)
    const [profitGrowth, setProfitGrowth] = useState(0)
    const [todaysOrder, setTodaysOrder] = useState(0)
    const [orderGrowth, setOrderGrowth] = useState(0)
    const [awaitingConfirmation, setAwaitingConfirmation] = useState(0)

    useEffect(() => {
        getHighlight()
    }, [])

    const getHighlight = async () => {
        try {
            let token = Cookies.get("userToken")
            let highlight = await axios.get(`${API_URL}/admin/highlight`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setTodaysProfit(highlight.data.data.todaysProfit)
            setProfitGrowth(highlight.data.data.profitGrowth)
            setTodaysOrder(highlight.data.data.todaysOrder)
            setOrderGrowth(highlight.data.data.orderGrowth)
            setAwaitingConfirmation(highlight.data.data.awaitingConfirmation)
        } catch (error) {
            console.log(error)
        }
    }

    return <Container sx={{ py: 2 }}>
        <Box sx={{ mb: 5 }}>
            <Highlight
                todaysProfit={todaysProfit}
                profitGrowth={profitGrowth}
                todaysOrder={todaysOrder}
                orderGrowth={orderGrowth}
                awaitingConfirmation={awaitingConfirmation}
            />
        </Box>
        <Box sx={{ mt: 5 }}>
            <Charts />
        </Box>
    </Container>
}

export default DashboardPage;