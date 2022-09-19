// import * as React from 'react';
import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, IconButton, Pagination } from '@mui/material'
import Text from '../../../../Components/atoms/Text';


const ProductTable = (props) => {

    let { productData, totalPage, changePage, page, setPage, handleOpenEdit } = props

    const clickPage = (event, value) => {
        changePage(value)
        console.log(value)
        setPage(value)
    }

    return (<>
        <Box sx={{ pl: 3, display: { xs: 'none', md: 'block' } }}>
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
                        {productData ? productData.length > 0 ? productData.map((data) => (
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
                        )) : null : null}
                    </TableBody>
                </Table>
            </TableContainer>
            {productData ? productData.length === 0 ?
                <Box fullWidth display="flex" sx={{ justifyContent: "center", my: 2 }}>
                    <Text>No Data Found</Text>
                </Box>
                : null : null}
            {/* <Box textAlign='right' sx={{ display: 'flex' }}>
                {productData ? productData.length > 0 ?
                    < Pagination count={totalPage} page={page} color='primary' onChange={clickPage} />
                    : null : null}
            </Box> */}
        </Box>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>No</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Product Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Category</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }} align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productData ? productData.length > 0 ? productData.map((data) => (
                            <TableRow
                                key={data.no}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{data.no}</TableCell>
                                <TableCell align="center">{data.name}</TableCell>
                                <TableCell align="center">{data.category}</TableCell>
                                <TableCell align="center">{data.action}</TableCell>
                            </TableRow>
                        )) : null : null}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {totalPage ?
                    <Pagination count={totalPage} page={page} color='primary' onChange={clickPage} />
                    : null}
                </Box> */}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {productData ? productData.length > 0 ?
                < Pagination count={totalPage} page={page} color='primary' onChange={clickPage} />
                : null : null}
        </Box>
    </>
    );
}

export default ProductTable