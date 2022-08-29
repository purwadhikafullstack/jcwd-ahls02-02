import { Create, Delete } from '@mui/icons-material';
import { Box, Container, Grid, IconButton, TextField, Typography } from '@mui/material';
import Text from '../../../Components/atoms/Text';
import axios from 'axios'
import { useEffect, useState } from 'react';
import Button from '../../../Components/atoms/Button';
import { API_URL } from '../../../helper';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { ToastNotification } from '../../../Components/Toast';
import ModalConfirm from '../../../Components/ModalConfirm';

const AdminCategoryPage = () => {
    const [category, setCategory] = useState()

    const [editCategory, setEditCategory] = useState()
    const [editCategoryValue, setEditCategoryValue] = useState()
    const [newCategory, setNewCategory] = useState()
    const [moreCategory, setMoreCategory] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [openDeleteCategory, setOpenDeleteCategory] = useState(false)
    const [textDelete, setTextDelete] = useState('')
    const [disableConfirm, setDisableConfirm] = useState(false)
    const [idDelete, setIdDelete] = useState()



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

    const printCategory = () => {
        if (category) {
            return category.map((val, id) => {
                if (editCategory !== val.id) {
                    return <Box sx={{ display: 'flex', mb: 2 }}>
                        <TextField fullWidth defaultValue={val.category_name} sx={{ mr: 1 }} disabled={editCategory === val.id ? false : true} />
                        <Button variant='contained' color='secondary' sx={{ mr: 1 }} onClick={() => setEditCategory(val.id)}>EDIT</Button>
                        <Button variant='contained' color='error' sx={{ mr: 1 }} onClick={() => {
                            handleCheckProduct(val.id)
                            // handleDeleteCategory(val.id)
                            setIdDelete(val.id)
                        }}>DELETE</Button>
                    </Box>
                } else {
                    return <Box sx={{ display: 'flex', mb: 2 }}>
                        <TextField fullWidth defaultValue={val.category_name} sx={{ mr: 1 }} disabled={editCategory === val.id ? false : true} onChange={(e) => setEditCategoryValue(e.target.value)} />
                        <Button variant='contained' color='primary' sx={{ mr: 1 }} onClick={() => handleEditCategory(editCategoryValue, val.id)}>SAVE</Button>
                    </Box>

                }
            })
        } else {
            return null
        }
    }

    const printMoreCategory = () => {
        if (moreCategory) {
            return <Box sx={{ display: 'flex', mb: 2 }}>
                <TextField fullWidth value={newCategory} onChange={(e) => setNewCategory(e.target.value)} sx={{ mr: 1 }} />
                <Button variant='contained' color='primary' sx={{ mr: 1 }} onClick={() => handleAddNewCategory(newCategory)} isSubmitting={isSubmitting}>SAVE</Button>
                <Button variant='contained' color='error' sx={{ mr: 1 }} onClick={() => setMoreCategory(false)}>DELETE</Button>
            </Box>
        }
    }

    const handleCheckProduct = (id) => {
        axios.get(`${API_URL}/products?id_category=${id}`)
            .then((response) => {
                console.log(response.data.product.length)
                if (response.data.product.length > 0) {
                    setOpenDeleteCategory(true)
                    setTextDelete(`There are ${response.data.product.length} products in this category. You have to move the products before you delete the category`)
                    setDisableConfirm(true)
                } else {
                    setOpenDeleteCategory(true)
                    setTextDelete('Are you sure you want to delete this category?')
                }
            }).catch((error) => {
                console.log(error)
            })
    }
    const handleEditCategory = (category_name, id) => {
        let token = Cookies.get("userToken")
        axios.patch(`${API_URL}/products/categories`, { id, category_name }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setEditCategory(null)
            toast.success('Category successfully updated')
        }).catch((error) => {
            toast.error('Something went wrong. Please try again')
        })
    }

    const handleDeleteCategory = (id) => {
        let token = Cookies.get("userToken")
        console.log(id)
        axios.delete(`${API_URL}/products/categories?id=${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setEditCategory(null)
            getCategory();
            toast.success('Category successfully deleted')
        }).catch((error) => {
            toast.error('Something went wrong. Please try again')
        })
    }

    const handleAddNewCategory = (category_name) => {
        setIsSubmitting(true)
        let token = Cookies.get("userToken")
        axios.post(`${API_URL}/products/categories`, { category_name }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            setMoreCategory(false)
            setNewCategory()
            getCategory();
            setIsSubmitting(false)
            toast.success('Category successfully added')
        }).catch((error) => {
            console.log(error)
            toast.error('Something went wrong. Please try again')
        })
    }

    return <Container sx={{ p: 5 }}>
        <form>
            <Grid sx={{ pb: 2 }}>
                <Text fontSize="h5" fontWeight="bold">Update Category</Text>
                <Text>Update the category list</Text>
            </Grid>
            {printCategory()}
            {printMoreCategory()}
            {!moreCategory ?
                <Button variant='contained' color='primary' onClick={() => setMoreCategory(true)}>ADD MORE CATEGORY</Button>
                : null
            }
            {/* <Button variant='contained' color='primary' onClick={handleAddMoreCategory}>ADD MORE CATEGORY</Button> */}
        </form>
        <ToastNotification />
        <ModalConfirm
            isOpen={openDeleteCategory}
            toggle={() => {
                setOpenDeleteCategory(!openDeleteCategory)
                setDisableConfirm(false)
                setIdDelete()
            }}
            text={textDelete}
            type='confirm'
            handleConfirm={() => handleDeleteCategory(idDelete)}
            disabled={disableConfirm}
        />
    </Container>
}

export default AdminCategoryPage;