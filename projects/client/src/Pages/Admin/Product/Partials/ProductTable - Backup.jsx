// import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton, Pagination } from '@mui/material'
import Button from '../../../../Components/atoms/Button';
import { Create, Delete } from '@mui/icons-material';
import axios from 'axios';
import { API_URL } from '../../../../helper';
import { useEffect } from 'react';

const ProductTable = (props) => {

    let { filterName, filterCategory, filterNeedsReceipt, filterMinPrice, filterMaxPrice, filterSort, filterPage, filterLimit, handlePage } = props
    let [productData, setProductData] = useState()
    let [totalPage, setTotalPage] = useState()

    useEffect(() => {
        getData()
    }, [])

    const getData = (page = filterPage) => {

        let query = ''

        if (filterName) {
            if (query) {
                query += `&name=${filterName}`
            } else {
                query += `?name=${filterName}`
            }
        }

        if (filterCategory) {
            if (query) {
                query += `&id_category=${filterCategory}`
            } else {
                query += `?id_category=${filterCategory}`
            }
        }

        if (filterNeedsReceipt) {
            if (query) {
                query += `&needs_receipt=${filterNeedsReceipt}`
            } else {
                query += `?needs_receipt=${filterNeedsReceipt}`
            }
        }

        if (filterMinPrice) {
            if (query) {
                query += `&min_price=${filterMinPrice}`
            } else {
                query += `?min_price=${filterMinPrice}`
            }
        }

        if (filterMaxPrice) {
            if (query) {
                query += `&max_price=${filterMaxPrice}`
            } else {
                query += `?max_price=${filterMaxPrice}`
            }
        }

        if (page) {
            if (query) {
                query += `&page=${page}`
            } else {
                query += `?page=${page}`
            }
        }

        if (filterLimit) {
            if (query) {
                query += `&limit=${filterLimit}`
            } else {
                query += `?limit=${filterLimit}`
            }
        }

        if (filterSort) {
            if (query) {
                query += `&${filterSort}`
            } else {
                query += `?${filterSort}`
            }
        }

        axios.get(`${API_URL}/products${query}`)
            .then((response) => {
                let temp = []
                response.data.product.forEach((val, id) => {
                    temp.push({
                        no: ((page - 1) * filterLimit) + id + 1,
                        name: val.name,
                        category: val.category_name,
                        quantity: val.quantity,
                        unit: val.unit,
                        price: val.selling_price,
                        action: <>
                            <IconButton aria-label="edit">
                                <Create />
                            </IconButton>
                            <IconButton aria-label="delete">
                                <Delete color='error' />
                            </IconButton>
                        </>
                    })
                    setProductData(temp)
                    setTotalPage(response.data.totalPage)
                })
            }).catch((error) => {
                console.log(error)
            })
    }

    const clickPage = (event, value) => {
        handlePage(value)
        getData(value);
    }

    return (
        <Box sx={{ pl: 3 }}>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>No</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Product Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Stock</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Unit</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Price</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productData ? productData.map((data) => (
                            <TableRow
                                key={data.no}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {data.no}
                                </TableCell>
                                <TableCell align="center">{data.name}</TableCell>
                                <TableCell align="center">{data.category}</TableCell>
                                <TableCell align="center">{data.quantity}</TableCell>
                                <TableCell align="center">{data.unit}</TableCell>
                                <TableCell align="center">Rp {data.price.toLocaleString()}</TableCell>
                                <TableCell align="center">{data.action}</TableCell>
                            </TableRow>
                        )) : null}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box textAlign='right' sx={{ display: 'flex' }}>
                {totalPage ?
                    <Pagination count={totalPage} defaultPage={filterPage} color='primary' onChange={clickPage} />
                    : null}
            </Box>
        </Box>
    );
}

export default ProductTable