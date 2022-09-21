

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

const today = new Date();
let array = today.setDate(today.getDate());
array = new Intl.DateTimeFormat("en-GB").format(array);
const [currentDay, currentMonth, currentYear] = array.split("/");


const Charts = () => {

    const [startDate, setStartDate] = useState(`${currentYear}-${currentMonth}-01`)
    const [endDate, setEndDate] = useState(`${currentYear}-${currentMonth}-${currentDay}`)
    const [range, setRange] = useState("Now")
    const [month, setMonth] = useState("")

    const [rangeStartDate, setRangeStartDate] = useState()
    const [rangeEndDate, setRangeEndDate] = useState()

    const [isLoading, setIsLoading] = useState(false)

    const [showRange, setShowRange] = useState(false)

    const [data, setData] = useState()

    useEffect(() => {
        getChartData();
    }, [])

    const getChartData = async () => {
        try {
            setIsLoading(true)
            let token = Cookies.get("userToken")
            let submit = await axios.get(`${API_URL}/admin/dailyReport?start_date=${startDate}&end_date=${endDate}`, {
                // let submit = await axios.get(`${API_URL}/admin/dailyProfit?range=${range}&month=${month}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (submit.data.success) {
                setData(submit.data.data)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (start_date = startDate, end_date = endDate) => {
        getChartData()
    }

    const handleSetDate = (type) => {
        let start = ''
        let end = ''

        setShowRange(false)

        if (type === 'Now') {
            start += `${currentYear}-${currentMonth}-01`
            end += `${currentYear}-${currentMonth}-${currentDay}`
        } else if (type === '7 Days') {
            let array = today.setDate(today.getDate() - 6);
            array = new Intl.DateTimeFormat("en-GB").format(array);
            const [startDay, startMonth, startYear] = array.split("/");

            start += `${startYear}-${startMonth}-${startDay}`
            end += `${currentYear}-${currentMonth}-${currentDay}`
        } else if (type === '30 Days') {
            let array = today.setDate(today.getDate() - 29);
            array = new Intl.DateTimeFormat("en-GB").format(array);
            const [startDay, startMonth, startYear] = array.split("/");

            start += `${startYear}-${startMonth}-${startDay}`
            end += `${currentYear}-${currentMonth}-${currentDay}`
        } else if (type === 'Custom') {
            setShowRange(true)
        }

        setStartDate(start)
        setEndDate(end)
    }

    const handleSetMonth = (month) => {
        let start = ''
        let end = ''

        // const today = new Date();
        // let array = await today.setDate(today.getDate());
        // array = await new Intl.DateTimeFormat("en-GB").format(array);
        // const [currentDay, currentMonth, currentYear] = array.split("/");

        start = `${currentYear}-${month}-01`

        if (month === '04' || month === '06' || month === '10' || month === '12') {
            end = `${currentYear}-${month}-30`
        } else if (month === '02') {
            end = `${currentYear}-${month}-28`
        } else {
            end = `${currentYear}-${month}-31`
        }

        setStartDate(start)
        setEndDate(end)
    }

    const convertDateToString = (fullDate) => {
        const year = `${fullDate.$y}`;
        const month = `0${1 + fullDate.$M}`.slice(-2);
        const date = `0${fullDate.$D}`.slice(-2);
        return `${year}-${month}-${date}`;
    };

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
                        onChange={(e) => {
                            setRange(e.target.value)
                            handleSetDate(e.target.value)
                        }}
                        displayEmpty
                        sx={{ mr: 2, width: 200 }}
                    >
                        <MenuItem value="">
                            <Typography color='grey.400'>Choose Range</Typography>
                        </MenuItem>
                        <MenuItem value={`Now`}>Current Month</MenuItem>
                        <MenuItem value={`7 Days`}>Last 7 Days</MenuItem>
                        <MenuItem value={`30 Days`}>Last 30 Days</MenuItem>
                        <MenuItem value={`Custom`}>Custom Range</MenuItem>
                    </Select>
                </form >
            </Box >
            <Button variant="contained" onClick={handleSubmit} disabled={startDate && endDate ? false : true} isLoading={isLoading}>Submit</Button>
            {/* <Button variant="contained" onClick={handleSubmit}>Submit</Button> */}
        </Box >
        {showRange ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', my: 3, alignItems: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={rangeStartDate}
                        onChange={(newValue) => {
                            setRangeStartDate(newValue);
                            let tempStartDate = newValue && convertDateToString(newValue)
                            setStartDate(tempStartDate)
                        }}
                        maxDate={rangeEndDate ? rangeEndDate : undefined}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <Text textAlign="center" sx={{ mx: 1 }}>until</Text>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={rangeEndDate}
                        onChange={(newValue) => {
                            setRangeEndDate(newValue);
                            let tempEndDate = newValue && convertDateToString(newValue)
                            setEndDate(tempEndDate)
                        }}
                        minDate={rangeStartDate ? rangeStartDate : undefined}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </Box>
            : null}
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
    </Box >
}

export default Charts;