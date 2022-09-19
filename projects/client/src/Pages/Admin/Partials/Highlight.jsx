import { Box, Card, CardContent, Container, Divider, Grid, Typography } from "@mui/material";
import Text from "../../../Components/atoms/Text";

const Highlight = (props) => {

    const { todaysProfit, profitGrowth, todaysOrder, orderGrowth, awaitingConfirmation } = props

    return <>
        <Text fontWeight="bold" fontSize="h5" sx={{ my: 2 }}>
            Today's Highlight:
        </Text>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <Card sx={{ textAlign: 'left', p: 1 }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Today's Profit:
                    </Typography>
                    <Typography variant="h5" component="span" fontWeight="bold" sx={{ mr: 1 }}>
                        IDR{todaysProfit ? todaysProfit.toLocaleString() : 0}
                    </Typography>
                    <Typography fontSize="12px" component="span" fontStyle="italic" fontWeight="bold" sx={{ mb: 1.5 }} color={profitGrowth < 0 ? "error" : "primary"}>
                        {(profitGrowth * 100).toFixed(2)}%
                    </Typography>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Card sx={{ textAlign: 'left', p: 1 }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Today's Orders:
                    </Typography>
                    <Typography variant="h5" component="span" fontWeight="bold" sx={{ mr: 1 }}>
                        {todaysOrder}
                    </Typography>
                    <Typography fontSize="12px" component="span" fontStyle="italic" fontWeight="bold" sx={{ mb: 1.5 }} color={orderGrowth ? orderGrowth < 0 ? "error" : "primary" : "grey.600"}>
                        {(orderGrowth * 100).toFixed(2)}%
                    </Typography>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Card sx={{ textAlign: 'left', p: 1 }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Awaiting Confirmation:
                    </Typography>
                    <Typography variant="h5" component="span" fontWeight="bold" sx={{ mr: 1 }}>
                        {awaitingConfirmation}
                    </Typography>
                </Card>
            </Grid>
        </Grid>
    </>
}

export default Highlight;