

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL } from "../../../helper";
import { Box, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Button from "../../../Components/atoms/Button";
import Text from "../../../Components/atoms/Text";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

const Charts = () => {

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [range, setRange] = useState("Now")
    const [month, setMonth] = useState("")

    const [data, setData] = useState()

    useEffect(() => {
        getChartData();
    }, [])

    const getChartData = async () => {
        try {
            let token = Cookies.get("userToken")
            // let submit = await axios.get(`${API_URL}/admin/dailyProfit?start_date=${start}&end_date=${end}`, {
            let submit = await axios.get(`${API_URL}/admin/dailyProfit?range=${range}&month=${month}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            console.log('submit.data.data', submit.data.data)
            setData(submit.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        getChartData()
    }

    // const convertDateToString = (fullDate) => {
    //     const year = `${fullDate.$y}`;
    //     const month = `0${1 + fullDate.$M}`.slice(-2);
    //     const date = `0${fullDate.$D}`.slice(-2);
    //     return `${year}-${month}-${date}`;
    // };

    // const handleSubmit = () => {
    //     let tempStartDate = startDate && convertDateToString(startDate);
    //     let tempEndDate = endDate && convertDateToString(endDate);
    //     getChartData(tempStartDate, tempEndDate);
    // }


    return <Box fullWidth>
        <Text fontWeight="bold" fontSize="h5" sx={{ mt: 2 }}>
            Profit:
        </Text>
        <Text color="text.secondary" fontSize="14px">
            Showed in IDR
        </Text>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 3 }}>
            <Box>
                <form>
                    <Select
                        value={range}
                        onChange={(e) => { setRange(e.target.value) }}
                        displayEmpty
                        size="small"
                        sx={{ mr: 2, width: 200 }}
                    >
                        <MenuItem value="">
                            <Typography color='grey.400'>Choose Range</Typography>
                        </MenuItem>
                        <MenuItem value={`Now`}>Current Month</MenuItem>
                        <MenuItem value={`7 Days`}>Last 7 Days</MenuItem>
                        <MenuItem value={`30 Days`}>Last 30 Days</MenuItem>
                        <MenuItem value={`Specific Month`}>Specific Month</MenuItem>
                    </Select>
                    {range === "Specific Month" ?
                        <Select
                            value={month}
                            onChange={(e) => { setMonth(e.target.value) }}
                            displayEmpty
                            size="small"
                            sx={{ width: 200, mr: 2 }}
                        >
                            <MenuItem value="">
                                <Typography color='grey.400'>Choose Month</Typography>
                            </MenuItem>
                            <MenuItem value={`01`}>January</MenuItem>
                            <MenuItem value={`02`}>February</MenuItem>
                            <MenuItem value={`03`}>March</MenuItem>
                            <MenuItem value={`04`}>April</MenuItem>
                            <MenuItem value={`05`}>May</MenuItem>
                            <MenuItem value={`06`}>June</MenuItem>
                            <MenuItem value={`07`}>July</MenuItem>
                            <MenuItem value={`08`}>August</MenuItem>
                            <MenuItem value={`09`}>September</MenuItem>
                            <MenuItem value={`10`}>October</MenuItem>
                            <MenuItem value={`11`}>November</MenuItem>
                            <MenuItem value={`12`}>December</MenuItem>
                        </Select>
                        : null}
                </form>
            </Box>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
        <Box sx={{ width: '100%', height: 300, mt: 2 }}>
            <ResponsiveContainer>
                <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        name="sales"
                        type="monotone"
                        dataKey="total_sales"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
        {/* <Grid item xs={12} md={9}>
            <Grid container alignItems="center">
                <Grid item xs={5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={startDate}
                            onChange={(newValue) => {
                                setStartDate(newValue);
                            }}
                            maxDate={endDate ? endDate : undefined}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={2}>
                    <Text textAlign="center">until</Text>
                </Grid>
                <Grid item xs={5}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            value={endDate}
                            onChange={(newValue) => {
                                setEndDate(newValue);
                            }}
                            minDate={startDate ? startDate : undefined}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </Grid>
            </Grid>
        </Grid> */}

    </Box>
}

export default Charts;