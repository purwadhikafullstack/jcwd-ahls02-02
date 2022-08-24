import { Search } from "@mui/icons-material";
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from 'axios'
import { API_URL } from "../../../../helper";
import { useEffect } from "react";
import Button from "../../../../Components/atoms/Button";

const Filter = (props) => {
    const { getDataFilter } = props
    const [selected, setSelected] = useState()
    const [category, setCategory] = useState()

    const [name, setName] = useState()
    const [idCategory, setIdCategory] = useState()
    const [needsReceipt, setNeedsReceipt] = useState()
    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [sort, setSort] = useState()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(12)

    useEffect(() => {
        getCategory();
    }, [])

    const getCategory = () => {
        axios.get(`${API_URL}/products/categories`)
            .then((response) => {
                setCategory(response.data)
            }).catch((error) => {
                console.log(error)
            })
    }

    const handleFilter = () => {
        console.log(name)
        getDataFilter(name, idCategory, minPrice, maxPrice, sort)
    }


    return <div>
        <Box sx={{ mt: 3 }}>
            <FormControl sx={{ mx: 1 }} fullWidth variant="outlined">
                <InputLabel>Product Name</InputLabel>
                <OutlinedInput
                    type='text'
                    endAdornment={
                        <InputAdornment position="end">
                            <Search />
                        </InputAdornment>
                    }
                    label="Product Search"
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
            <Typography fontSize='18px' textAlign='left' sx={{ p: 1, mt: 2, fontWeight: 'bold' }}>Category</Typography>
            {category ? category.map(item => {
                return <Box textAlign='left'>
                    <Button onClick={() => setIdCategory(item.id)}>
                        <Typography fontSize='14px' textAlign='left' sx={{ pl: 1 }} color={idCategory === item.id ? 'primary' : 'black'}>{item.category_name}</Typography>
                    </Button>
                </Box>
            }) : null}
            <Typography fontSize='18px' textAlign='left' sx={{ mt: 2, fontWeight: 'bold' }}>Price</Typography>
            <Box sx={{ pl: 1, mt: 1 }}>
                <TextField fullWidth id='min_price' label="Minimum Price" variant="outlined" onChange={(e) => setMinPrice((e.target.value))} type='number' sx={{ my: 1 }} />
                <TextField fullWidth id='max_price' label="Maximum Price" variant="outlined" onChange={(e) => setMaxPrice((e.target.value))} type='number' sx={{ my: 1 }} />
            </Box>
            <Typography fontSize='18px' textAlign='left' sx={{ mt: 2, fontWeight: 'bold' }}>Sort By</Typography>
            <Box sx={{ pl: 1, pt: 1, mt: 1 }}>
                <FormControl fullWidth>
                    <InputLabel id="sort-by-label">Choose</InputLabel>
                    <Select
                        labelId="sort-by-label"
                        id="sort-by-label"
                        // value={age}
                        label="Sort"
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <MenuItem value={`sort=name&order=asc`}>Product Name (a-z)</MenuItem>
                        <MenuItem value={`sort=name&order=desc`}>Product Name (z-a)</MenuItem>
                        <MenuItem value={`sort=price&order=asc`}>From Lowest Price</MenuItem>
                        <MenuItem value={`sort=price&order=desc`}>From Highest Price</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ my: 3 }}>
                <Button variant='contained' width='100%' onClick={handleFilter}>FILTER</Button>
            </Box>
        </Box>
    </div >
}

export default Filter;