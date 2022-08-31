// import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton, Pagination } from '@mui/material'
import Button from '../../../../Components/atoms/Button';
import { Create, Delete } from '@mui/icons-material';
import axios from 'axios';
import { API_URL } from '../../../../helper';
import { useEffect } from 'react';

const ProductTable = (props) => {

    let { productData, totalPage, changePage, page, handleOpenEdit } = props

    const [newPage, setNewPage] = useState(1)

    const clickPage = (event, value) => {
        changePage(value)
        setNewPage(value)
        console.log(value)
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
                                <TableCell component="th" scope="row">{data.no}</TableCell>
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
                    <Pagination count={totalPage} page={newPage} color='primary' onChange={clickPage} />
                    : null}
            </Box>
        </Box>
    );
}

export default ProductTable