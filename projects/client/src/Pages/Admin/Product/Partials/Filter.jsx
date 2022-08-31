import { Search } from "@mui/icons-material";
import { Box, FormControl, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from 'axios'
import { API_URL } from "../../../../helper";
import { useEffect, useRef } from "react";
import Button from "../../../../Components/atoms/Button";

const Filter = (props) => {
    const { getDataFilter, category } = props
    // const [category, setCategory] = useState()

    const [name, setName] = useState()
    const [idCategory, setIdCategory] = useState()
    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [sort, setSort] = useState('')

    const defaultName = useRef(null);
    const defaultMinPrice = useRef(null);
    const defaultMaxPrice = useRef(null);
    const defaultSort = useRef(null);

    const handleFilter = () => {
        console.log(name, idCategory, minPrice, maxPrice, sort)
        getDataFilter(name, idCategory, minPrice, maxPrice, sort)
    }

    const handleReset = () => {
        getDataFilter(null, null, null, null, 'sort=id&order=asc')
        setName(null)
        setIdCategory(null)
        setMinPrice(null)
        setMaxPrice(null)
        setSort('sort=id&order=asc')
        defaultName.current.value = ""
        defaultMinPrice.current.value = ""
        defaultMaxPrice.current.value = ""
        defaultSort.current.value = ""
    }

    const handleChangeSort = (event) => {
        setSort(event.target.value);
    };

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
                    defaultValue={name}
                    label="Product Search"
                    onChange={(e) => setName(e.target.value)}
                    inputRef={defaultName}
                />
            </FormControl>
            <Typography fontSize='18px' textAlign='left' sx={{ p: 1, mt: 2, fontWeight: 'bold' }}>Category</Typography>
            {category ? category.map(item => {
                return <Box textAlign='left' key={item.id}>
                    <Button onClick={() => setIdCategory(item.id)}>
                        <Typography fontSize='14px' textAlign='left' sx={{ pl: 1 }} color={idCategory === item.id ? 'primary' : 'black'}>{item.category_name}</Typography>
                    </Button>
                </Box>
            }) : null}
            <Typography fontSize='18px' textAlign='left' sx={{ mt: 2, fontWeight: 'bold' }}>Price</Typography>
            <Box sx={{ pl: 1, mt: 1 }}>
                <TextField
                    // defaultValue={minPrice}
                    fullWidth id='min_price'
                    label="Minimum Price"
                    variant="outlined"
                    onChange={(e) => setMinPrice((e.target.value))}
                    type='number'
                    sx={{ my: 1 }}
                    inputRef={defaultMinPrice}
                />
                <TextField value={maxPrice}
                    fullWidth id='max_price'
                    label="Maximum Price"
                    variant="outlined"
                    onChange={(e) => setMaxPrice((e.target.value))}
                    type='number'
                    sx={{ my: 1 }}
                    inputRef={defaultMaxPrice}
                />
            </Box>
            <Typography fontSize='18px' textAlign='left' sx={{ mt: 2, fontWeight: 'bold' }}>Sort By</Typography>
            <Box sx={{ pl: 1, pt: 1, mt: 1 }}>
                <FormControl fullWidth>
                    <Select
                        value={sort}
                        onChange={handleChangeSort}
                        displayEmpty
                    >
                        <MenuItem value="">
                            <Typography color='grey.600' textAlign='left'>Choose One</Typography>
                        </MenuItem>
                        <MenuItem value={`sort=name&order=asc`}>Product Name (a-z)</MenuItem>
                        <MenuItem value={`sort=name&order=desc`}>Product Name (z-a)</MenuItem>
                        <MenuItem value={`sort=selling_price&order=asc`}>From Lowest Price</MenuItem>
                        <MenuItem value={`sort=selling_price&order=desc`}>From Highest Price</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Button variant='contained' width='100%' onClick={handleFilter}>FILTER</Button>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Button variant='outlined' color='error' width='100%' onClick={handleReset}>RESET</Button>
            </Box>
        </Box>
    </div >
}

export default Filter;