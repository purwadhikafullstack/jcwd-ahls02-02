import { Box, Container, Grid, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import Button from "../../../Components/atoms/Button";
import Filter from "./Partials/Filter";
import ProductTable from "./Partials/ProductTable";
import axios from "axios";
import { API_URL } from "../../../helper";
import { Create, Delete } from "@mui/icons-material";
import ModalAddProduct from "./Partials/ModalAddProduct";

const AdminProductPage = () => {

    const [name, setName] = useState()
    const [idCategory, setIdCategory] = useState()
    const [needsReceipt, setNeedsReceipt] = useState()
    const [minPrice, setMinPrice] = useState()
    const [maxPrice, setMaxPrice] = useState()
    const [sort, setSort] = useState('')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)

    const [productData, setProductData] = useState()
    const [category, setCategory] = useState()
    const [totalPage, setTotalPage] = useState()

    const [openAddProduct, setOpenAddProduct] = useState(false)

    useEffect(() => {
        getData()
    }, [])

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

    const getData = (filterName = name, filterCategory = idCategory, filterNeedsReceipt = needsReceipt, filterMinPrice = minPrice, filterMaxPrice = maxPrice, filterSort = sort, filterPage = page, filterLimit = limit) => {

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

        if (filterPage) {
            if (query) {
                query += `&page=${filterPage}`
            } else {
                query += `?page=${filterPage}`
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
                        no: ((filterPage - 1) * filterLimit) + id + 1,
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

    const getDataFilter = (newName, newIdCategory, newMinPrice, newMaxPrice, newSort) => {
        setName(newName)
        setIdCategory(newIdCategory)
        setMinPrice(newMinPrice)
        setMaxPrice(newMaxPrice)
        setSort(newSort)
        setPage(1)

        getData(newName, newIdCategory, needsReceipt, newMinPrice, newMaxPrice, newSort, 1, limit);

        // console.log('name', name)
        // console.log('idCategory', idCategory)
        // console.log('needsReceipt', needsReceipt)
        // console.log('minPrice', minPrice)
        // console.log('maxPrice', maxPrice)
        // console.log('sort', sort)
        // console.log('page', page)
        // console.log('limit', limit)
    }

    const handlePage = (newPage) => {
        setPage(newPage)
        getData(name, idCategory, needsReceipt, minPrice, maxPrice, sort, newPage, limit);
    }

    return <div>
        <Container>
            <Grid container>
                <Grid xs={12} md={3} sx={{ p: 1 }}>
                    <Filter
                        getDataFilter={getDataFilter}
                        name={name}
                        idCategory={idCategory}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        sort={sort}
                        category={category}
                    />
                </Grid>
                <Grid xs={12} md={9} sx={{ pt: 4 }}>
                    <Box textAlign='right'>
                        <Button variant='contained' onClick={() => setOpenAddProduct(true)}>Add New product</Button>
                    </Box>
                    <ProductTable
                        productData={productData}
                        totalPage={totalPage}
                        changePage={handlePage}
                        page={page}
                    />
                </Grid>
            </Grid>
        </Container>
        <ModalAddProduct
            open={openAddProduct}
            close={() => setOpenAddProduct(false)}
            categoryList={category}
        />
    </div>
}

export default AdminProductPage;