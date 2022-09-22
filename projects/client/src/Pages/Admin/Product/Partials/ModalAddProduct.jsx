import { useState, useRef } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { ArrowForwardIos, CheckCircle, Delete, DeleteForever } from "@mui/icons-material";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL } from "../../../../helper";
import { ToastNotification } from "../../../../Components/Toast";
import toast from "react-hot-toast";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 400,
    width: '100%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalAddProduct = (props) => {
    const { open, close, categoryList } = props

    const [page, setPage] = useState(1)

    const [name, setName] = useState()
    const [newDataImage, setNewDataImage] = useState()
    const [newImage, setNewImage] = useState()
    const [category, setCategory] = useState('')
    const [description, setDescription] = useState()
    const [needsReceipt, setNeedsReceipt] = useState(false)
    const [sellingPrice, setSellingPrice] = useState()
    const [buyingPrice, setBuyingPrice] = useState()
    const [formStock, setFormStock] = useState([{ quantity: '', unit: '', default_unit: true }])
    const [unitConversion, setUnitConversion] = useState(0)

    const [stockValidity, setStockValidity] = useState(false)

    const defaultName = useRef(null);
    const defaultDescription = useRef(null);

    const [defaultUnit, setDefaultUnit] = useState('')
    const [smallUnit, setSmallUnit] = useState('')

    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        setNeedsReceipt(event.target.checked)
    };

    const handleChangeCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleChangeDefaultUnit = (event) => {
        setDefaultUnit(event.target.value);
    };

    const handleChangeSmallUnit = (event) => {
        setSmallUnit(event.target.value);
    };

    const handleClose = () => {
        close();
        setName();
        setDescription();
        setNewDataImage()
        setNewImage()
        setPage(1)
        setDefaultUnit('')
        setSmallUnit('')
        setCategory('')
        setSellingPrice()
        setBuyingPrice()
        let temp = [{ quantity: '', unit: '', default_unit: false }]
        setFormStock(temp)
        // defaultName.current.value = ""
        // defaultDescription.current.value = ""
    }

    const handleUpload = (e) => {
        setNewDataImage(e.target.files[0])
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            setNewImage(e.target.result)
        }
    }

    const handleAddUnit = () => {
        let temp = [...formStock]
        temp.push({ quantity: '', unit: '', default_unit: false })
        setFormStock(temp)
        checkAvailability(temp)
    }

    const checkAvailability = (temp, unitConversion = null) => {
        // let temp = [...formStock]
        if (temp.length == 1) {
            if (temp[0].quantity && temp[0].unit) {
                return setStockValidity(true)
            } else {
                return setStockValidity(false)
            }
        } else if (temp.length == 2) {
            if (temp[0].quantity && temp[0].unit && temp[1].quantity && temp[1].unit && unitConversion) {
                return setStockValidity(true)
            } else {
                return setStockValidity(false)
            }
        }
    }

    const printStock = () => {
        return formStock.map((val, id) => {
            return <Grid container alignItems='center' sx={{ mb: 2 }}>
                {id > 0 ?
                    <>
                        <Grid xs={5} sx={{ pr: 1 }}>
                            <form>
                                <Typography color='grey.600' fontSize='14px'>Product Stock</Typography>
                                <TextField
                                    fullWidth
                                    type='number'
                                    size="small"
                                    variant='outlined'
                                    onChange={(e) => {
                                        let temp = [...formStock]
                                        if (temp[1]) {
                                            temp[1].quantity = e.target.value
                                            temp[1].default_unit = false
                                        } else {
                                            temp.push({ quantity: '', unit: '', default_unit: false })
                                            temp[1].quantity = e.target.value
                                            temp[1].default_unit = false
                                        }
                                        setFormStock(temp)
                                        checkAvailability(temp)
                                    }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                />
                            </form>
                        </Grid>
                        <Grid xs={6} sx={{ px: 1 }}>
                            <form>
                                <Typography color='grey.600' fontSize='14px'>Pieces Unit</Typography>
                                <FormControl size='small' fullWidth>
                                    <Select
                                        value={smallUnit}
                                        // onChange={handleChangeSmallUnit}
                                        onChange={(e) => {
                                            handleChangeSmallUnit(e)
                                            let temp = [...formStock]
                                            if (temp[1]) {
                                                temp[1].unit = e.target.value
                                                temp[1].default_unit = false
                                            } else {
                                                temp.push({ quantity: '', unit: '', default_unit: false })
                                                temp[1].unit = e.target.value
                                                temp[1].default_unit = false
                                            }
                                            setFormStock(temp)
                                            checkAvailability(temp)
                                        }}
                                        displayEmpty
                                        InputProps={{ inputProps: { min: 0 } }}
                                    >
                                        <MenuItem value="">
                                            <Typography color='grey.400'>Choose One</Typography>
                                        </MenuItem>
                                        <MenuItem value={`Kapsul`}>Kapsul</MenuItem>
                                        <MenuItem value={`Tablet`}>Tablet</MenuItem>
                                        <MenuItem value={`Mililiter`}>Mililiter</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </Grid>
                        <Grid xs={1}>
                            <IconButton sx={{ mt: 3 }} onClick={() => handleDeleteStock(id)}>
                                <Delete color='error' />
                            </IconButton>
                        </Grid>
                    </>
                    :
                    <>
                        <Grid xs={5} sx={{ pr: 1 }}>
                            <form>
                                <Typography color='grey.600' fontSize='14px'>Product Stock</Typography>
                                <TextField
                                    fullWidth
                                    type='number'
                                    size="small"
                                    variant='outlined'
                                    onChange={(e) => {
                                        let temp = [...formStock]
                                        temp[0].quantity = e.target.value
                                        temp[0].default_unit = true
                                        setFormStock(temp)
                                        checkAvailability(temp)
                                    }}
                                    InputProps={{ inputProps: { min: 1 } }}
                                />
                            </form>
                        </Grid>
                        <Grid xs={7} sx={{ pl: 1 }}>
                            <form>
                                <Typography color='grey.600' fontSize='14px'>Default Unit</Typography>
                                <FormControl size='small' fullWidth>
                                    <Select
                                        value={defaultUnit}
                                        onChange={(e) => {
                                            handleChangeDefaultUnit(e)
                                            let temp = [...formStock]
                                            temp[0].unit = e.target.value
                                            temp[0].default_unit = true
                                            setFormStock(temp)
                                            checkAvailability(temp)
                                        }}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            <Typography color='grey.400'>Choose One</Typography>
                                        </MenuItem>
                                        <MenuItem value={`Botol`}>Botol</MenuItem>
                                        <MenuItem value={`Sachet`}>Sachet</MenuItem>
                                        <MenuItem value={`Strip`}>Strip</MenuItem>
                                    </Select>
                                </FormControl>
                            </form>
                        </Grid>
                    </>}
            </Grid>
        })
    }

    const handleDeleteStock = (index) => {
        let tempForm = [...formStock]
        tempForm.splice(index, 1)
        setFormStock(tempForm)
        checkAvailability(tempForm)
        setSmallUnit()

    }

    const handleSubmit = () => {
        let token = Cookies.get("userToken")
        let formData = new FormData();
        let data = {
            name,
            id_category: category,
            description,
            needs_receipt: needsReceipt,
            selling_price: sellingPrice,
            buying_price: buyingPrice,
            stock: formStock,
            unit_conversion: unitConversion
        }

        formData.append('data', JSON.stringify(data))
        formData.append('image', newDataImage)


        axios.post(`${API_URL}/products/`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            handleClose();
            toast.success(`Product successfully added`)

        }).catch((error) => {
            console.log(error)
            toast.error(`Something went wrong. Please try again`)
        })
    }

    return (
        <div>
            <ToastNotification />
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Box sx={{ mb: 2 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            New Product
                        </Typography>
                    </Box>
                    {page === 1 ?
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <CheckCircle fontSize='14px' color='primary' sx={{ mr: 1 }} />
                                <Typography fontSize='14px'>Product Detail</Typography>
                                <ArrowForwardIos fontSize='14px' sx={{ mx: 2, fill: '#A9A9A9' }} />
                                {/* <Typography fontSize='14px' sx={{ mx: 2 }} >-</Typography> */}
                                <CheckCircle fontSize='14px' color='grey' sx={{ mr: 1, fill: '#A9A9A9' }} />
                                <Typography fontSize='14px' color='grey.500'>Product Stock</Typography>
                            </Box>
                            <form>
                                <Typography color='grey.600' fontSize='14px'>Product Name</Typography>
                                <TextField
                                    fullWidth
                                    size="small"
                                    variant='outlined'
                                    onChange={(e) => setName(e.target.value)}
                                    sx={{ mb: 2 }}
                                    // inputRef={defaultName}
                                    defaultValue={name}
                                    inputProps={{ maxLength: 100 }}
                                />
                                <Typography color='grey.600' fontSize='14px'>Product Image</Typography>

                                {newImage ?
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <img src={newImage} alt={`product image`} style={{ width: "40%" }} />
                                        <Button onClick={() => setNewImage()} color='error' variant='outlined' sx={{ ml: 2 }}>Remove</Button>
                                    </Box>
                                    :
                                    <Button
                                        variant="contained"
                                        component="label"
                                        sx={{ mb: 2 }}
                                    >
                                        Upload File
                                        <input
                                            type="file"
                                            hidden
                                            onChange={(e) => handleUpload(e)}
                                        />
                                    </Button>
                                }
                                <Typography color='grey.600' fontSize='14px'>Product Category</Typography>
                                <FormControl
                                    fullWidth
                                    size='small'
                                    sx={{ mb: 2 }}
                                >
                                    <Select
                                        value={category}
                                        onChange={handleChangeCategory}
                                        displayEmpty
                                    >
                                        <MenuItem value="">
                                            <Typography color='grey.400'>Choose One</Typography>
                                        </MenuItem>
                                        {categoryList ? categoryList.map(val => {
                                            return <MenuItem key={val.id} value={val.id}>{val.category_name}</MenuItem>
                                        }) : null}
                                    </Select>
                                </FormControl>
                                <Typography color='grey.600' fontSize='14px'>Product Description</Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    variant='outlined'
                                    onChange={(e) => setDescription(e.target.value)}
                                    defaultValue={description}
                                    inputProps={{ maxLength: 1000 }}
                                    // inputRef={defaultDescription}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox checked={checked} onChange={handleChange} />
                                    <Typography color='grey.600' fontSize='14px'>Requires prescription</Typography>
                                </Box>
                            </form>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Button color='error' variant='outlined' onClick={handleClose}>Cancel</Button>
                                <Button color='primary' variant='contained' onClick={() => setPage(2)} disabled={name && newDataImage && category && description ? false : true}>Next</Button>
                            </Box>
                        </>
                        :
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <CheckCircle fontSize='14px' color='primary' sx={{ mr: 1 }} />
                                <Typography fontSize='14px'>Product Detail</Typography>
                                <ArrowForwardIos fontSize='14px' sx={{ mx: 2, fill: '#A9A9A9' }} />
                                <CheckCircle fontSize='14px' color='primary' sx={{ mr: 1 }} />
                                <Typography fontSize='14px'>Product Stock</Typography>
                            </Box>
                            <form>
                                <Typography color='grey.600' fontSize='14px'>Default Selling Price</Typography>
                                <TextField
                                    fullWidth
                                    type='number'
                                    size="small"
                                    variant='outlined'
                                    InputProps={{ inputProps: { min: 1 } }}
                                    sx={{ mb: 2 }}
                                    onChange={(e) => setSellingPrice(e.target.value)}
                                />
                                <Typography color='grey.600' fontSize='14px'>Default Buying Price</Typography>
                                <TextField
                                    fullWidth
                                    type='number'
                                    size="small"
                                    variant='outlined'
                                    InputProps={{ inputProps: { min: 1 } }}
                                    sx={{ mb: 2 }}
                                    onChange={(e) => setBuyingPrice(e.target.value)}
                                />
                            </form>
                            {printStock()}
                            {formStock.length < 2 ?
                                <Button onClick={handleAddUnit}>Add more unit</Button>
                                : null}
                            {smallUnit && defaultUnit ?
                                <form>
                                    <Typography color='grey.600' fontSize='14px'>How many {smallUnit} per {defaultUnit}</Typography>
                                    <TextField
                                        fullWidth
                                        type='number'
                                        size="small"
                                        variant='outlined'
                                        InputProps={{ inputProps: { min: 1 } }}
                                        sx={{ mb: 2 }}
                                        // sx={{ mb: 2, width: '40%' }}
                                        onChange={(e) => {
                                            setUnitConversion(e.target.value)
                                            checkAvailability(formStock, e.target.value)
                                        }}
                                    />
                                </form>
                                : null
                            }
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Button color='error' variant='outlined' onClick={() => setPage(1)}>Back</Button>
                                <Button color='primary' variant='contained' onClick={handleSubmit} disabled={sellingPrice && buyingPrice && stockValidity ? false : true}>Submit</Button>
                            </Box>
                        </>
                    }
                </Box>
            </Modal>
        </div>
    );
}

export default ModalAddProduct