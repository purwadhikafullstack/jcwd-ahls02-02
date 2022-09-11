import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { API_IMAGE_URL, API_URL } from '../../../../helper';
import { Divider, Grid, MenuItem, Select, Tab, Tabs, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';

const styleBig = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: { xs: 300, md: 600 },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    // display: { xs: 'none', md: 'block' }
};

const styleSmall = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 550,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const ModalAddPrescription = (props) => {
    const { isOpen, toggle, image } = props

    const [tab, setTab] = useState(0)
    const [productData, setProductData] = useState()

    const [formStockGeneric, setFormStockGeneric] = useState([{ name: '', quantity: '', unit: '' }])
    const [formStockPrescription, setFormStockPrescription] = useState([{ prescriptionName: '', ingredients: [{ name: '', quantity: '', unit: '' }] }])

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    useEffect(() => {
        getAllProduct()
    }, [])

    const getAllProduct = async () => {
        try {
            let getData = await axios.get(`${API_URL}/products/all`)
            setProductData(getData.data)
        } catch (error) {
            console.log(error)
        }
    }

    const printStockGeneric = () => {
        return formStockGeneric.map((value, index) => {
            return <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography color='grey.600' fontSize='14px'>Product Name</Typography>
                        <Select
                            size='small'
                            value={value.name}
                            fullWidth
                            onChange={(e) => {
                                let temp = [...formStockGeneric]
                                temp[index].name = e.target.value
                                setFormStockGeneric(temp)
                            }}
                            displayEmpty
                        >
                            <MenuItem value="">
                                <Typography color='grey.400'>Choose One</Typography>
                            </MenuItem>
                            {productData ?
                                productData.map((value) => {
                                    return <MenuItem key={`i-${value.id}`} value={`${value.name}`}>{value.name}</MenuItem>
                                })
                                : null}
                        </Select>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color='grey.600' fontSize='14px'>Quantity</Typography>
                        <TextField
                            fullWidth
                            type='number'
                            size="small"
                            variant='outlined'
                            onChange={(e) => {
                                let temp = [...formStockGeneric]
                                temp.quantity = e.target.value
                                setFormStockGeneric(temp)
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color='grey.600' fontSize='14px'>Unit</Typography>
                        <Select
                            size='small'
                            value={value.unit}
                            fullWidth
                            onChange={(e) => {
                                let temp = [...formStockGeneric]
                                temp[index].unit = e.target.value
                                setFormStockGeneric(temp)
                            }}
                            displayEmpty
                        >
                            <MenuItem value="">
                                <Typography color='grey.400'>Choose One</Typography>
                            </MenuItem>
                            {value.name ?
                                productData.map((valueProduct) => {
                                    if (valueProduct.name === value.name)
                                        return valueProduct.stock.map((valueStock) => {
                                            return <MenuItem key={`i-${valueProduct.id}`} value={`${valueStock.unit}`}>{valueStock.unit}</MenuItem>
                                        })
                                })
                                : null}
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color='error' onClick={() => {
                            let temp = [...formStockGeneric]
                            temp.splice(index, 1)
                            setFormStockGeneric(temp)
                        }}>Delete Product</Button>
                    </Grid>

                </Grid>
                <Divider sx={{ my: 2 }} />
            </>
        })
    }

    const printStockPrescription = () => {
        return formStockPrescription.map((value, index) => {
            return <>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography color='grey.600' fontSize='14px'>Prescription Name</Typography>
                        <TextField
                            fullWidth
                            type='text'
                            size="small"
                            variant='outlined'
                            onChange={(e) => {
                                let temp = [...formStockPrescription]
                                temp.name = e.target.value
                                setFormStockPrescription(temp)
                            }}
                        />
                    </Grid>
                    {value.ingredients.map((valueIngredient, indexIngredient) => {
                        return <>
                            <Grid item xs={5}>
                                <Typography color='grey.600' fontSize='14px'>Product Name</Typography>
                                <Select
                                    size='small'
                                    value={valueIngredient.name}
                                    fullWidth
                                    onChange={(e) => {
                                        let temp = [...formStockPrescription]
                                        temp[index].ingredients[indexIngredient].name = e.target.value
                                        setFormStockPrescription(temp)
                                    }}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <Typography color='grey.400'>Choose One</Typography>
                                    </MenuItem>
                                    {productData ?
                                        productData.map((value) => {
                                            return <MenuItem key={`i-${value.id}`} value={`${value.name}`}>{value.name}</MenuItem>
                                        })
                                        : null}
                                </Select>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography color='grey.600' fontSize='14px'>Quantity</Typography>
                                <TextField
                                    fullWidth
                                    type='number'
                                    size="small"
                                    variant='outlined'
                                    onChange={(e) => {
                                        let temp = [...formStockPrescription]
                                        temp[index].ingredients[indexIngredient].quantity = e.target.value
                                        setFormStockPrescription(temp)
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography color='grey.600' fontSize='14px'>Unit</Typography>
                                <Select
                                    size='small'
                                    value={valueIngredient.unit}
                                    fullWidth
                                    onChange={(e) => {
                                        let temp = [...formStockPrescription]
                                        temp[index].ingredients[indexIngredient].unit = e.target.value
                                        setFormStockPrescription(temp)
                                    }}
                                    displayEmpty
                                >
                                    <MenuItem value="">
                                        <Typography color='grey.400'>Choose One</Typography>
                                    </MenuItem>
                                    {valueIngredient.name ?
                                        productData.map((valueProduct) => {
                                            if (valueProduct.name === valueIngredient.name)
                                                return valueProduct.stock.map((valueStock) => {
                                                    return <MenuItem key={`i-${valueProduct.id}`} value={`${valueStock.unit}`}>{valueStock.unit}</MenuItem>
                                                })
                                        })
                                        : null}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <Button color='error' size="small" onClick={() => {
                                    let temp = [...formStockPrescription]
                                    temp[index].ingredients.splice(indexIngredient, 1)
                                    setFormStockGeneric(temp)
                                }}>Delete Ingredient</Button>
                            </Grid>
                        </>
                    })}
                    <Grid item xs={12}>
                        <Button variant="contained" size="small" sx={{ mr: 2 }} onClick={() => handleAddIngredient(index)}>Add Ingredients</Button>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
            </>
        })
    }

    const handleAddMoreGeneric = () => {
        let temp = [...formStockGeneric]
        temp.push({ name: '', quantity: '', unit: '' })
        setFormStockGeneric(temp)
    }

    const handleAddMorePrescription = () => {
        let temp = [...formStockPrescription]
        temp.push({ prescriptionName: '', ingredients: [{ name: '', quantity: '', unit: '' }] })
        setFormStockPrescription(temp)
    }

    const handleAddIngredient = (index) => {
        let temp = [...formStockPrescription]
        temp[index].ingredients.push({ name: '', quantity: '', unit: '' })
        setFormStockPrescription(temp)
    }

    const handleSubmit = async () => {
        try {
            console.log(formStockGeneric)
            console.log(formStockPrescription)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        toggle();
        let tempGeneric = [{ name: '', quantity: '', unit: '' }]
        let tempPrescription = [{ prescriptionName: '', ingredients: [{ name: '', quantity: '', unit: '' }] }]
        setFormStockGeneric(tempGeneric)
        setFormStockPrescription(tempPrescription)

    }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={toggle}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleBig}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        Submit Prescription Product
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: { xs: 'flex', md: 'block' }, justifyContent: 'center' }}>
                                <img src={`${API_IMAGE_URL}${image}`} style={{ maxWidth: 200, maxHeight: 600 }} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            {/* <Box sx={{ pl: 3 }}>
                                <form>
                                    <Typography color='grey.600' fontSize='14px'>Patient Name</Typography>
                                    <TextField
                                        fullWidth
                                        type='number'
                                        size="small"
                                        variant='outlined'
                                        sx={{ mb: 2 }}
                                    // onChange={(e) => setSellingPrice(e.target.value)}
                                    />
                                </form>
                            </Box> */}
                            <Box display="flex" sx={{ justifyContent: 'center' }}>
                                <Tabs value={tab} onChange={handleChange}>
                                    <Tab label="generic" {...a11yProps(0)} />
                                    <Tab label="prescription" {...a11yProps(0)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={tab} index={0}>
                                {printStockGeneric()}
                                <Button onClick={handleAddMoreGeneric}>
                                    Add More Product
                                </Button>
                            </TabPanel>
                            <TabPanel value={tab} index={1}>
                                {printStockPrescription()}
                                <Button onClick={handleAddMorePrescription}>
                                    Add More Product
                                </Button>
                            </TabPanel>
                        </Grid>
                    </Grid>
                    <Box display='flex' sx={{ justifyContent: 'flex-end' }}>
                        <Button color='error' sx={{ mr: 2 }} onClick={handleCancel}>Cancel</Button>
                        <Button variant='contained' onClick={handleSubmit}>Submit</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default ModalAddPrescription;