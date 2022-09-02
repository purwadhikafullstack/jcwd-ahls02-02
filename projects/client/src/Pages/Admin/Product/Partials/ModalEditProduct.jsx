import { useState, useRef } from "react";
import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { ArrowForwardIos, CheckCircle, Delete, DeleteForever } from "@mui/icons-material";
import Cookies from "js-cookie";
import axios from "axios";
import { API_URL, API_IMAGE_URL } from "../../../../helper";
import { ToastNotification } from "../../../../Components/Toast";
import toast from "react-hot-toast";
import { useEffect } from "react";

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

const ModalEditProduct = (props) => {
    const { open, close, categoryList, data, index, refreshData } = props

    const [page, setPage] = useState(1)

    const [name, setName] = useState()
    const [newDataImage, setNewDataImage] = useState()
    const [newImage, setNewImage] = useState()
    const [category, setCategory] = useState()
    const [description, setDescription] = useState()
    const [needsReceipt, setNeedsReceipt] = useState()
    const [sellingPrice, setSellingPrice] = useState()
    const [buyingPrice, setBuyingPrice] = useState()
    const [formStock, setFormStock] = useState([])
    const [defaultStock, setDefaultStock] = useState([{ quantity: '', unit: '', default_unit: 'true' }])
    const [smallStock, setSmallStock] = useState([{ quantity: '', unit: '', default_unit: 'false' }])
    const [moreUnit, setMoreUnit] = useState(false)

    const [unitConversion, setUnitConversion] = useState()

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
        let temp = [{ quantity: '', unit: '', default_unit: 'false' }]
        setFormStock(temp)
        // refreshData()
        setMoreUnit()
        // defaultName.current.value = ""
        // defaultDescription.current.value = ""
    }

    const handleUpload = (e) => {
        setNewDataImage(e.target.files[0])
        console.log(e.target.files[0])
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            setNewImage(e.target.result)
        }
    }

    const handleAddUnit = () => {
        setMoreUnit(true)
        console.log('add unit')
        console.log('default unit', data[0].default_unit)

        if (data[0].default_unit === 'false') {
            console.log(' default unit: ', data[0].unit)
            let temp = data[0].unit
            setSmallUnit(temp)
        } else {
            console.log('unit: ', data[0].unit)
            let temp = data[0].unit
            setDefaultUnit(temp)
        }
        // checkAvailability(temp)
    }

    const handleDeleteUnit = () => {
        setMoreUnit(false)
        setUnitConversion()
        if (data[0].default_unit === 'true') {
            setSmallUnit()
            setSmallStock([{ quantity: '', unit: '', default_unit: 'false' }])
        } else if (data[0].default_unit === 'false') {
            setDefaultUnit()
            setDefaultStock([{ quantity: '', unit: '', default_unit: 'true' }])
        }
        // checkAvailability(temp)
    }

    const printStockDefault = () => {
        if (data) {
            return data.map((val, id) => {
                return <Grid container alignItems='center' sx={{ mb: 1 }}>
                    {val.default_unit === 'true' ?
                        <>
                            <Grid xs={5} sx={{ pr: 1 }}>
                                <form>
                                    <Typography color='grey.600' fontSize='14px'>Product Stock</Typography>
                                    <TextField
                                        fullWidth
                                        type='number'
                                        size="small"
                                        variant='outlined'
                                        defaultValue={val.quantity}
                                        onChange={(e) => {
                                            let temp = [...defaultStock]
                                            temp[0].quantity = e.target.value
                                            setDefaultStock(temp)
                                            // let temp = [...formStock]
                                            // if (temp[id]) {
                                            //     temp[id].quantity = e.target.value
                                            // } else {
                                            //     temp.push({ quantity: '', unit: '', default_unit: true })
                                            //     temp[id].quantity = e.target.value
                                            // }
                                            // setFormStock(temp)
                                            // checkAvailability(temp)
                                        }}
                                    />
                                </form>
                            </Grid>
                            <Grid xs={7} sx={{ pl: 1 }}>
                                <form>
                                    <Typography color='grey.600' fontSize='14px'>Default Unit</Typography>
                                    <FormControl size='small' fullWidth>
                                        <Select
                                            defaultValue={val.unit}
                                            disabled
                                            // value={val.unit}
                                            onChange={(e) => {
                                                handleChangeDefaultUnit(e)
                                                let temp = [...defaultStock]
                                                temp[0].unit = e.target.value
                                                setDefaultStock(temp)

                                                // let temp = [...formStock]
                                                // if (temp[id]) {
                                                //     temp[id].unit = e.target.value
                                                // } else {
                                                //     temp.push({ quantity: '', unit: '', default_unit: true })
                                                //     temp[id].unit = e.target.value
                                                // }
                                                // setFormStock(temp)
                                                // checkAvailability(temp)
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
                        </> : null}
                </Grid>
            })
        } else {
            return null
        }
    }

    const printStockSmall = () => {
        if (data) {
            return data.map((val, id) => {
                if (val.default_unit === 'false') {
                    return <Grid container alignItems='center' sx={{ mb: 2 }}>
                        <Grid xs={5} sx={{ pr: 1 }}>
                            <form>
                                <Typography color='grey.600' fontSize='14px'>Product Stock</Typography>
                                <TextField
                                    fullWidth
                                    type='number'
                                    size="small"
                                    variant='outlined'
                                    defaultValue={val.quantity}
                                    onChange={(e) => {
                                        let temp = [...smallStock]
                                        temp[0].quantity = e.target.value
                                        setSmallStock(temp)
                                    }}
                                />
                            </form>
                        </Grid>
                        <Grid xs={7} sx={{ px: 1 }}>
                            <form>
                                <Typography color='grey.600' fontSize='14px'>Pieces Unit</Typography>
                                <FormControl size='small' fullWidth>
                                    <Select
                                        defaultValue={val.unit}
                                        onChange={(e) => {
                                            handleChangeSmallUnit(e)
                                            let temp = [...smallStock]
                                            temp[0].unit = e.target.value
                                            setSmallStock(temp)
                                        }}
                                        displayEmpty
                                        disabled
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
                    </Grid>
                }
            })
        } else {
            return null
        }
    }

    const printMoreStock = () => {
        if (moreUnit) {
            if (data[0].default_unit === 'false') {
                return <Grid container alignItems='center' sx={{ mb: 2 }}>
                    <Grid xs={5} sx={{ pr: 1 }}>
                        <form>
                            <Typography color='grey.600' fontSize='14px'>Product Stock</Typography>
                            <TextField
                                fullWidth
                                type='number'
                                size="small"
                                variant='outlined'
                                // defaultValue={val.quantity}
                                onChange={(e) => {
                                    let temp = [...defaultStock]
                                    temp[0].quantity = e.target.value
                                    setDefaultStock(temp)
                                }}
                            />
                        </form>
                    </Grid>
                    <Grid xs={7} sx={{ px: 1 }}>
                        <form>
                            <Typography color='grey.600' fontSize='14px'>Pieces Unit</Typography>
                            <FormControl size='small' fullWidth>
                                <Select
                                    // value={val.unit}
                                    onChange={(e) => {
                                        handleChangeDefaultUnit(e)
                                        let temp = [...defaultStock]
                                        temp[0].unit = e.target.value
                                        setDefaultStock(temp)
                                    }}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <Typography color='grey.400'>Choose One</Typography>
                                    </MenuItem>
                                    <MenuItem value={`Kapsul`}>Botol</MenuItem>
                                    <MenuItem value={`Tablet`}>Strip</MenuItem>
                                    <MenuItem value={`Mililiter`}>Sachet</MenuItem>
                                </Select>
                            </FormControl>
                        </form>
                    </Grid>
                </Grid>
            } else {
                return <Grid container alignItems='center' sx={{ mb: 2 }}>
                    <Grid xs={5} sx={{ pr: 1 }}>
                        <form>
                            <Typography color='grey.600' fontSize='14px'>Product Stock</Typography>
                            <TextField
                                fullWidth
                                type='number'
                                size="small"
                                variant='outlined'
                                // defaultValue={val.quantity}
                                onChange={(e) => {
                                    let temp = [...smallStock]
                                    temp[0].quantity = e.target.value
                                    setSmallStock(temp)
                                }}
                            />
                        </form>
                    </Grid>
                    <Grid xs={7} sx={{ px: 1 }}>
                        <form>
                            <Typography color='grey.600' fontSize='14px'>Pieces Unit</Typography>
                            <FormControl size='small' fullWidth>
                                <Select
                                    // value={val.unit}
                                    onChange={(e) => {
                                        handleChangeSmallUnit(e)
                                        let temp = [...smallStock]
                                        temp[0].unit = e.target.value
                                        setSmallStock(temp)
                                    }}
                                    displayEmpty
                                    defaultValue=""
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
                </Grid>
            }
        }

    }

    const printDeleteUnit = () => {
        if (data) {
            if (data.length < 2 && !moreUnit) {
                return <Button onClick={handleAddUnit}>Add more unit</Button>
            } else if (data.length < 2 && moreUnit) {
                return <Button color='error' onClick={handleDeleteUnit}>Delete additional unit</Button>
            } else if (data.length === 2) {
                return null
            }
        } else {
            return null
        }
    }

    const printImage = () => {
        if (newImage) {
            return <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <img src={newImage} alt={`product image`} style={{ width: "40%" }} />
                <Button onClick={() => setNewImage()} color='error' variant='outlined' sx={{ ml: 2 }}>Undo</Button>
            </Box >
        } else {
            if (data) {
                return <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <img src={`${API_IMAGE_URL}${data[0].image}`} alt={`product image`} style={{ width: "40%" }} />
                    {/* <img src={`${data[0].image}`} alt={`product image`} style={{ width: "40%" }} /> */}
                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mb: 2, ml: 2 }}
                    >
                        Change
                        <input
                            type="file"
                            hidden
                            onChange={(e) => handleUpload(e)}
                        />
                    </Button>
                </Box>
            } else {
                return null
            }
        }
    }

    const printConversion = () => {
        if (data) {
            if (data.length > 1) {
                return <form>
                    <Typography color='grey.600' fontSize='14px'>How many {smallUnit ? smallUnit : data[1].unit} per {defaultUnit ? defaultUnit : data[0].unit}</Typography>
                    <TextField
                        fullWidth
                        type='number'
                        size="small"
                        variant='outlined'
                        sx={{ mb: 2 }}
                        defaultValue={data[0].unit_conversion}
                        disabled
                        // sx={{ mb: 2, width: '40%' }}
                        onChange={(e) => {
                            setUnitConversion(e.target.value)
                            // checkAvailability(formStock, e.target.value)
                        }}
                    />
                </form>
            } else {
                if (data[0].default_unit === 'true') {
                    if (smallUnit) {
                        // console.log("small unit", smallUnit)
                        return <form>
                            <Typography color='grey.600' fontSize='14px'>How many {smallUnit} per {defaultUnit ? defaultUnit : data[0].unit}</Typography>
                            <TextField
                                fullWidth
                                type='number'
                                size="small"
                                variant='outlined'
                                sx={{ mb: 2 }}
                                // defaultValue={data[0].unit_conversion}
                                // sx={{ mb: 2, width: '40%' }}
                                onChange={(e) => {
                                    setUnitConversion(e.target.value)
                                    // checkAvailability(formStock, e.target.value)
                                }}
                            />
                        </form>
                    } else {
                        return null
                    }
                } else if (data[0].default_unit === 'false') {
                    if (defaultUnit) {
                        return <form>
                            <Typography color='grey.600' fontSize='14px'>How many {smallUnit ? smallUnit : data[0].unit} per {defaultUnit}</Typography>
                            <TextField
                                fullWidth
                                type='number'
                                size="small"
                                variant='outlined'
                                sx={{ mb: 2 }}
                                // defaultValue={data[0].unit_conversion}
                                // sx={{ mb: 2, width: '40%' }}
                                onChange={(e) => {
                                    setUnitConversion(e.target.value)
                                    // checkAvailability(formStock, e.target.value)
                                }}
                            />
                        </form>
                    } else {
                        return null
                    }
                } else {
                    return null
                }
                // if (defaultUnit && smallUnit) {
                //     <form>
                //         <Typography color='grey.600' fontSize='14px'>How many {data[1].unit} per {data[0].unit}</Typography>
                //         <TextField
                //             fullWidth
                //             type='number'
                //             size="small"
                //             variant='outlined'
                //             sx={{ mb: 2 }}
                //             // defaultValue={data[0].unit_conversion}
                //             // sx={{ mb: 2, width: '40%' }}
                //             onChange={(e) => {
                //                 setUnitConversion(e.target.value)
                //                 // checkAvailability(formStock, e.target.value)
                //             }}
                //         />
                //     </form>
                // } else {
                //     return null
                // }
            }
        }
    }

    const handleSubmit = () => {
        let token = Cookies.get("userToken")
        let formData = new FormData();

        let temp = [...defaultStock, ...smallStock]
        setFormStock(temp)

        let newData = {
            name,
            id_category: category,
            description,
            needs_receipt: needsReceipt,
            selling_price: sellingPrice,
            buying_price: buyingPrice,
            stock: temp,
            unit_conversion: unitConversion
        }

        console.log(data)

        axios.patch(`${API_URL}/products/editData?id=${index}`, newData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then((response) => {
            console.log(response.data)
            if (newImage) {
                formData.append('image', newDataImage)

                axios.patch(`${API_URL}/products/editPicture?id=${index}`, formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }).then((response) => {
                    handleClose();
                    console.log(response.data)
                    toast.success(`Product successfully updated`)

                }).catch((error) => {
                    console.log(error)
                    toast.error(`Something went wrong. Please try again`)
                })
            } else {
                toast.success(`Product successfully updated`)
                handleClose();
            }
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
                                    defaultValue={data ? data[0].name : null}
                                // inputRef={defaultName}
                                />
                                <Typography color='grey.600' fontSize='14px'>Product Image</Typography>

                                {printImage()}

                                <Typography color='grey.600' fontSize='14px'>Product Category</Typography>
                                <FormControl
                                    fullWidth
                                    size='small'
                                    sx={{ mb: 2 }}
                                >
                                    <Select
                                        defaultValue={data ? data[0].id_category : category}
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
                                    defaultValue={data ? data[0].description : null}
                                // inputRef={defaultDescription}
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Checkbox defaultChecked={data ? data[0].needs_receipt === 'false' ? false : true : false} onChange={handleChange} />
                                    <Typography color='grey.600' fontSize='14px'>Requires prescription</Typography>
                                </Box>
                            </form>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Button color='error' variant='outlined' onClick={handleClose}>Cancel</Button>
                                <Button color='primary' variant='contained' onClick={() => setPage(2)}>Next</Button>
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
                            <Typography color='grey.600' fontSize='14px'>Default Selling Price</Typography>
                            <form>
                                <TextField
                                    fullWidth
                                    type='number'
                                    size="small"
                                    sx={{ mb: 2 }}
                                    variant='outlined'
                                    defaultValue={data ? data[0].selling_price : null}
                                    onChange={(e) => setSellingPrice(e.target.value)}
                                // defaultValue={val.quantity}
                                />
                            </form>
                            <Typography color='grey.600' fontSize='14px'>Default Buying Price</Typography>
                            <form>
                                <TextField
                                    fullWidth
                                    type='number'
                                    size="small"
                                    variant='outlined'
                                    sx={{ mb: 2 }}
                                    defaultValue={data ? data[0].buying_price : null}
                                    onChange={(e) => setBuyingPrice(e.target.value)}
                                />
                            </form>
                            {printStockDefault()}
                            {printStockSmall()}
                            {printMoreStock()}
                            {printDeleteUnit()}
                            {printConversion()}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                <Button color='error' variant='outlined' onClick={() => setPage(1)}>Back</Button>
                                <Button color='primary' variant='contained' onClick={handleSubmit} disabled={name || newDataImage || category || description || sellingPrice || buyingPrice || formStock || unitConversion ? false : true}>Submit</Button>
                            </Box>
                        </>
                    }
                </Box>
            </Modal>
        </div>
    );
}

export default ModalEditProduct;