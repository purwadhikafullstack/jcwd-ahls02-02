import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "../../../../Components/atoms/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { API_IMAGE_URL, API_URL } from "../../../../helper";
import {
  Divider,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import ModalConvertStock from "./ModalConvertStock";
import {
  AddCircleOutline,
  Remove,
  RemoveCircleOutline,
} from "@mui/icons-material";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { ToastNotification } from "../../../../Components/Toast";

const styleBig = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   minWidth: { xs: 300, md: 600 },
  minWidth: "80vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  maxHeight: "70vh",
  overflowY: "auto",
  // display: { xs: 'none', md: 'block' }
};

const styleSmall = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 550,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
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
  const {
    isOpen,
    toggle,
    image,
    selectedOrder,
    setSelectedOrder,
    getPrescriptionData,
  } = props;

  const [tab, setTab] = useState(0);
  const [productData, setProductData] = useState();
  const [openModalConvert, setOpenModalConvert] = useState(false);
  const [selectedProductConvert, setSelectedProductConvert] = useState();

  const [formStockGeneric, setFormStockGeneric] = useState([]); // name = id_product, unit = id_stock
  const [formStockPrescription, setFormStockPrescription] = useState([]); // name = id_product, unit = id_stock
  // const [formStockGeneric, setFormStockGeneric] = useState([
  //   { name: "", quantity: "", unit: "" },
  // ]); // name = id_product, unit = id_stock
  // const [formStockPrescription, setFormStockPrescription] = useState(
  //   [
  //   {
  //     prescriptionName: "",
  //     ingredients: [{ name: "", quantity: "", unit: "" }],
  //   },
  // ]
  // ); // name = id_product, unit = id_stock

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    try {
      let getData = await axios.get(`${API_URL}/products/all`);

      setProductData(getData.data);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    }
  };

  const addGenericProduct = (genericIndex, value) => {
    let temp = [...formStockGeneric];
    temp[genericIndex].id_product = value;
    productData.map((valueProduct) => {
      if (valueProduct.id === value)
        valueProduct.stock.map((valueStock) => {
          if (valueStock.default_unit === "true") {
            temp[genericIndex].id_stock = valueStock.idStock;
            temp[genericIndex].unit = valueStock.unit;
          }
        });
    });
    setFormStockGeneric(temp);
  };

  const printStockGeneric = () => {
    return formStockGeneric.map((value, index) => {
      return (
        <>
          <Grid container spacing={2} sx={{ p: 0 }}>
            <Grid item xs={12}>
              <Typography
                color="grey.600"
                fontSize="14px"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pb: 1,
                }}
              >
                Product Name
                {/* {formStockGeneric.length > 1 && ( */}
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  onClick={() => {
                    let temp = [...formStockGeneric];
                    temp.splice(index, 1);
                    setFormStockGeneric(temp);
                  }}
                >
                  Delete Product
                </Button>
                {/* )} */}
              </Typography>
              <Select
                size="small"
                value={value.id_product}
                fullWidth
                onChange={(e) => {
                  addGenericProduct(index, e.target.value);
                }}
                displayEmpty
              >
                <MenuItem value="">
                  <Typography color="grey.400">Choose One</Typography>
                </MenuItem>
                {productData
                  ? productData.map((valueProduct) => {
                      return (
                        <MenuItem
                          key={`i-generic-${index}-${valueProduct.id}`}
                          value={valueProduct.id}
                        >
                          {valueProduct.name}
                        </MenuItem>
                      );
                    })
                  : null}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <Typography color="grey.600" fontSize="14px">
                Quantity
              </Typography>
              <TextField
                fullWidth
                type="number"
                size="small"
                variant="outlined"
                onChange={(e) => {
                  let temp = [...formStockGeneric];
                  temp[index].quantity = e.target.value;
                  setFormStockGeneric(temp);
                }}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography color="grey.600" fontSize="14px">
                Unit(Stock)
              </Typography>
              <Select
                size="small"
                value={value.id_stock}
                fullWidth
                onChange={(e) => {
                  let temp = [...formStockGeneric];
                  temp[index].unit = e.target.value;
                  setFormStockGeneric(temp);
                }}
                displayEmpty
                disabled
              >
                <MenuItem value="">
                  <Typography color="grey.400">Choose One</Typography>
                </MenuItem>
                {value.id_product
                  ? productData.map((valueProduct) => {
                      if (valueProduct.id === value.id_product)
                        return valueProduct.stock.map((valueStock) => {
                          return (
                            <MenuItem
                              key={`i-generic-${index}-stock-${valueProduct.id}`}
                              value={valueStock.idStock}
                            >
                              {valueStock.unit}({valueStock.quantity})
                            </MenuItem>
                          );
                        });
                    })
                  : null}
              </Select>
            </Grid>
            {/* {formStockGeneric.length > 1 && (
              <Grid item xs={12}>
                <Button
                  color="error"
                  onClick={() => {
                    let temp = [...formStockGeneric];
                    temp.splice(index, 1);
                    setFormStockGeneric(temp);
                  }}
                >
                  Delete Product
                </Button>
              </Grid>
            )} */}
          </Grid>
          <Divider sx={{ my: 2 }} />
        </>
      );
    });
  };

  const addPrescriptionIngredient = (
    prescriptionIndex,
    ingredientIndex,
    value
  ) => {
    let temp = [...formStockPrescription];
    temp[prescriptionIndex].ingredients[ingredientIndex].id_product = value;
    productData.map((valueProduct) => {
      if (valueProduct.id === value) {
        valueProduct.stock.map((valueStock) => {
          if (valueStock.default_unit === "false") {
            temp[prescriptionIndex].ingredients[ingredientIndex].id_stock =
              valueStock.idStock;
            temp[prescriptionIndex].ingredients[ingredientIndex].unit =
              valueStock.unit;
          }
        });
      }
    });
    setFormStockPrescription(temp);
  };

  const handleClickConvert = (valueIngredient) => {
    let productToConvert = [];
    productData.forEach((value) => {
      if (value.id === valueIngredient.id_product) {
        productToConvert.push(value);
      }
    });
    setSelectedProductConvert(productToConvert[0]);
    setOpenModalConvert(true);
  };

  const handleSelectIngredientUnit = (idProduct, idStock, prescriptionIndex, ingredientIndex) => {
    let temp = [...formStockPrescription];
    temp[prescriptionIndex].ingredients[ingredientIndex].id_stock = idStock;
    productData.map((valueProduct) => {
      if (valueProduct.id === idProduct) {
        valueProduct.stock.map((valueStock) => {
          if (valueStock.id === idStock) {
            temp[prescriptionIndex].ingredients[ingredientIndex].unit =
              valueStock.unit;
            temp[prescriptionIndex].ingredients[ingredientIndex].default_unit =
              valueStock.default_unit;
          }
        });
      }
    });
    setFormStockPrescription(temp);
  };

  const printStockPrescription = () => {
    return formStockPrescription.map((value, index) => {
      return (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                color="grey.600"
                fontSize="14px"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  pb: 1,
                }}
              >
                Medicine Name
                {/* {formStockPrescription.length > 1 && ( */}
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => {
                    let temp = [...formStockPrescription];
                    temp.splice(index, 1);
                    setFormStockPrescription(temp);
                  }}
                >
                  Delete Product
                </Button>
                {/* )} */}
              </Typography>
              <TextField
                fullWidth
                type="text"
                size="small"
                variant="outlined"
                onChange={(e) => {
                  let temp = [...formStockPrescription];
                  temp[index].prescriptionName = e.target.value;
                  setFormStockPrescription(temp);
                }}
              />
            </Grid>
            {value.ingredients.map((valueIngredient, indexIngredient) => {
              return (
                <>
                  <Grid
                    item
                    container
                    alignItems="center"
                    // justifyContent="right"
                    xs={12}
                    sx={{ height: "32px" }}
                  >
                    <Typography fontSize="14px">
                      Ingredient {indexIngredient + 1}
                    </Typography>
                    {formStockPrescription[index].ingredients.length > 1 && (
                      <IconButton
                        color="error"
                        aria-label="remove ingredient"
                        component="label"
                        size="small"
                        onClick={() => {
                          let temp = [...formStockPrescription];
                          temp[index].ingredients.splice(indexIngredient, 1);
                          setFormStockGeneric(temp);
                        }}
                      >
                        <Tooltip title="Remove Ingredient">
                          <RemoveCircleOutline fontSize="inherit" />
                        </Tooltip>
                      </IconButton>
                    )}
                  </Grid>
                  <Grid item xs={8} md={5}>
                    <Typography color="grey.600" fontSize="14px">
                      {/* Ingredient-{indexIngredient + 1} */}
                      Name
                    </Typography>
                    <Select
                      size="small"
                      value={valueIngredient.id_product}
                      fullWidth
                      onChange={(e) => {
                        addPrescriptionIngredient(
                          index,
                          indexIngredient,
                          e.target.value
                        );
                      }}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <Typography color="grey.400">Choose One</Typography>
                      </MenuItem>
                      {productData
                        ? productData.map((valueProduct) => {
                            return (
                              <MenuItem
                              key={`i-prescription-product-${index}-${indexIngredient}-${valueProduct.id}`}
                                value={valueProduct.id}
                              >
                                {valueProduct.name}
                              </MenuItem>
                            );
                          })
                        : null}
                    </Select>
                  </Grid>
                  <Grid item xs={4} md={3}>
                    <Typography color="grey.600" fontSize="14px">
                      Quantity
                    </Typography>
                    <TextField
                      fullWidth
                      type="number"
                      size="small"
                      variant="outlined"
                      onChange={(e) => {
                        let temp = [...formStockPrescription];
                        temp[index].ingredients[indexIngredient].quantity =
                          e.target.value;
                        setFormStockPrescription(temp);
                      }}
                      InputProps={{ inputProps: { min: 1 } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography color="grey.600" fontSize="14px">
                      Unit(Stock)
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        onClick={() => {
                          handleClickConvert(valueIngredient);
                        }}
                        disabled={!valueIngredient.id_product}
                        sx={{ p: 0, m: 0 }}
                      >
                        <Typography
                          fontSize="12px"
                          sx={{ textDecoration: "underline" }}
                        >
                          Convert
                        </Typography>
                      </Button>
                    </Typography>
                    <Select
                      size="small"
                      value={valueIngredient.id_stock}
                      fullWidth
                      onChange={(e) => {
                        // let temp = [...formStockPrescription];
                        // temp[index].ingredients[indexIngredient].id_stock =
                        //   e.target.value;
                        // setFormStockPrescription(temp);
                        handleSelectIngredientUnit(valueIngredient.id_product, e.target.value, index, indexIngredient);
                      }}
                      displayEmpty
                    >
                      <MenuItem value="">
                        <Typography color="grey.400">Choose One</Typography>
                      </MenuItem>
                      {valueIngredient.id_product
                        ? productData.map((valueProduct) => {
                            if (valueProduct.id === valueIngredient.id_product)
                              return valueProduct.stock.map((valueStock) => {
                                return (
                                  <MenuItem
                                  key={`i-prescription-unit-${index}-${indexIngredient}-${valueProduct.id}`}
                                    value={valueStock.idStock}
                                  >
                                    {valueStock.unit}({valueStock.quantity})
                                  </MenuItem>
                                );
                              });
                          })
                        : null}
                    </Select>
                  </Grid>
                  {/* <Grid item xs={12}> */}
                  {/* <Button
                      color="error"
                      size="small"
                      onClick={() => {
                        let temp = [...formStockPrescription];
                        temp[index].ingredients.splice(indexIngredient, 1);
                        setFormStockGeneric(temp);
                      }}
                    >
                      Remove Ingredient
                    </Button> */}
                  {/* <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => {
                        setOpenModalConvert(true);
                      }}
                    >
                      Convert Stock
                    </Button> */}
                  {/* </Grid> */}
                </>
              );
            })}
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                // sx={{ mr: 2 }}
                onClick={() => handleAddIngredient(index)}
              >
                Add Ingredients
                {/* <AddCircleOutline/> */}
              </Button>
              {/* {formStockPrescription.length > 1 && (
                <Button
                  color="error"
                  onClick={() => {
                    let temp = [...formStockPrescription];
                    temp.splice(index, 1);
                    setFormStockPrescription(temp);
                  }}
                >
                  Delete Product
                </Button>
              )} */}
            </Grid>
          </Grid>
          <Divider sx={{ my: 2 }} />
        </>
      );
    });
  };

  const handleAddMoreGeneric = () => {
    let temp = [...formStockGeneric];
    temp.push({ id_product: "", quantity: "", id_stock: "" });
    setFormStockGeneric(temp);
  };

  const handleAddMorePrescription = () => {
    let temp = [...formStockPrescription];
    temp.push({
      prescriptionName: "",
      ingredients: [{ id_product: "", quantity: "", id_stock: "" }],
    });
    setFormStockPrescription(temp);
  };

  const handleAddIngredient = (index) => {
    let temp = [...formStockPrescription];
    temp[index].ingredients.push({
      id_product: "",
      quantity: "",
      id_stock: "",
    });
    setFormStockPrescription(temp);
  };

  const handleSubmit = async () => {
    try {
      const token = Cookies.get("userToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const data = {
        id_order: selectedOrder.id_order,
        id_prescription: selectedOrder.id_prescription,
        id_user: selectedOrder.id_user,
        formStockGeneric,
        formStockPrescription,
        productData,
      };
      const res = await axios.post(
        `${API_URL}/admin/order/prescription`,
        data,
        { headers }
      );
      if (res.data.success) {
        toast.success("Prescription processed!");
        getPrescriptionData();
        handleClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    }
  };

  const handleClose = () => {
    toggle();
    // let tempGeneric = [{ id_product: "", quantity: "", id_stock: "" }];
    // let tempPrescription = [
    //   {
    //     prescriptionName: "",
    //     ingredients: [{ id_product: "", quantity: "", id_stock: "" }],
    //   },
    // ];
    let tempGeneric = [];
    let tempPrescription = [];
    setFormStockGeneric(tempGeneric);
    setFormStockPrescription(tempPrescription);
  };

  return (
    <div>
      <ToastNotification/>
      <Modal
        open={isOpen}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{zIndex:30}}
      >
        <Box sx={styleBig}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Submit Prescription Product
          </Typography>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={4}
              container
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Box
                sx={{
                  display: { xs: "flex", md: "block" },
                  justifyContent: "center",
                }}
              >
                <img
                  src={`${API_IMAGE_URL}${image}`}
                  style={{ maxWidth: 200, maxHeight: 600 }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Box display="flex" sx={{ justifyContent: "center" }}>
                <Tabs value={tab} onChange={handleChange}>
                  <Tab label="generic" {...a11yProps(0)} />
                  <Tab label="concoction" {...a11yProps(0)} />
                </Tabs>
              </Box>
              <Divider sx={{ mx: 3 }} />
              <TabPanel value={tab} index={0} sx={{ p: 0 }}>
                {formStockGeneric && <>{printStockGeneric()}</>}
                <Box textAlign="center">
                  <Button variant="contained" onClick={handleAddMoreGeneric}>
                    Add Product
                  </Button>
                </Box>
              </TabPanel>
              <TabPanel value={tab} index={1}>
                {formStockPrescription && <>{printStockPrescription()}</>}
                <Box textAlign="center">
                  <Button
                    variant="contained"
                    onClick={handleAddMorePrescription}
                  >
                    Add Product
                  </Button>
                </Box>
              </TabPanel>
            </Grid>
          </Grid>
          <Box display="flex" sx={{ justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              color="error"
              sx={{ mr: 2 }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
          <ModalConvertStock
            isOpen={openModalConvert}
            toggle={() => setOpenModalConvert(!openModalConvert)}
            getAllProduct={getAllProduct}
            selectedProduct={selectedProductConvert}
            setSelectedProduct={setSelectedProductConvert}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default ModalAddPrescription;
