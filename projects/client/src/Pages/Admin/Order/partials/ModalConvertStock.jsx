import { ArrowDownward, ArrowRightAlt } from "@mui/icons-material";
import { Modal, Backdrop, Fade, Box, Grid, TextField, Divider } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../../Components/atoms/Button";
import Text from "../../../../Components/atoms/Text";
import ModalConfirm from "../../../../Components/ModalConfirm";
import { API_URL } from "../../../../helper";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxWidth: "70vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 30,
};

const ModalConvertStock = (props) => {
  const { isOpen, toggle, getAllProduct, selectedProduct, setSelectedProduct } =
    props;

  const { token, userId } = useSelector((state) => {
    return {
      token: state.userReducer.token,
      userId: state.userReducer.id,
    };
  });
  const [conversionInput, setConversionInput] = useState(0);
  const [conversionResult, setConversionResult] = useState();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [disableConvert, setDisableConvert] = useState(true)

  const handleCloseModal = () => {
    setSelectedProduct();
    toggle();
  };

  const handleCalculateConversion = (value) => {
    const tempResult = selectedProduct.unit_conversion * value;
    setConversionInput(value);
    setConversionResult(tempResult);
  };

  const handleConvertProduct = async () => {
    try {
      const data = {
        productId: selectedProduct.id,
        stock: selectedProduct.stock,
        conversionInput,
        conversionResult,
      };
      const res = await axios.patch(
        `${API_URL}/products/conversion/${selectedProduct.id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success("Product successfully converted");
        getAllProduct();
        setSelectedProduct();
        toggle();
      } else {
        toast.error("Something went wrong, please try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isOpen}
      onClose={handleCloseModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box sx={style}>
          {selectedProduct && (
            <>
              <Box sx={{ pb: 1 }}>
                <Text fontSize="h5" fontWeight="bold" color={"primary"}>
                  Convert Unit
                </Text>
              </Box>
              <Grid container>
                <Grid item xs={6} md={4}>
                  <Text>Product</Text>
                </Grid>
                <Grid item xs={6} md={8}>
                  : {selectedProduct.name}
                </Grid>

                <Grid item xs={6} md={4}>
                  <Text>Current Stock</Text>
                </Grid>
                <Grid item xs={6} md={8}>
                  : {selectedProduct.stock[0].quantity}{" "}
                  {selectedProduct.stock[0].unit} {" & "}
                  {selectedProduct.stock[1].quantity}
                  {selectedProduct.stock[1].unit}
                </Grid>
              </Grid>
              <Divider sx={{py:1}}/>
              <Box sx={{ pb: 1 }}>
                <Text sx={{ py: 1 }}>
                  Input Conversion ({selectedProduct.unit_conversion}{" "}
                  {selectedProduct.stock[1].unit} /{" "}
                  {selectedProduct.stock[0].unit})
                </Text>
                <Grid container>
                  <Grid item xs={12} md={5}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        fullWidth
                        onChange={(e) =>
                          handleCalculateConversion(e.target.value)
                        }
                        sx={{ maxWidth: "80%" }}
                        InputProps={{
                          inputProps: {
                            min: 0,
                            max: selectedProduct.stock[0].quantity,
                            style: { textAlign: "center" },
                          },
                        }}
                      />
                      <Text sx={{ pl: 1 }} textAlign="center">
                        {selectedProduct.stock[0].unit}
                      </Text>
                    </Box>
                  </Grid>
                  <Grid
                    item
                    xs={10}
                    md={1}
                    container
                    justifyContent="center"
                    alignItems="center"
                  >
                    <ArrowRightAlt
                      color="primary"
                      sx={{ display: { xs: "none", md: "block" } }}
                    />
                    <ArrowDownward
                      color="primary"
                      sx={{ py: 1, display: { xs: "block", md: "none" } }}
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TextField
                        type="number"
                        variant="outlined"
                        size="small"
                        value={conversionResult}
                        disabled
                        sx={{ maxWidth: "80%" }}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: "center" },
                          },
                        }}
                      />
                      <Text sx={{ pl: 1 }} textAlign="center">
                        {selectedProduct.stock[1].unit}
                      </Text>
                    </Box>
                  </Grid>
                  {/* <Grid item xs={6} md={4}>
                    <Text>Convert Unit</Text>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    : {selectedProduct.unit_conversion}{" "}
                    {selectedProduct.stock[1].unit} /{" "}
                    {selectedProduct.stock[0].unit}
                  </Grid> */}
                </Grid>
              </Box>
            </>
          )}
          <Box sx={{ display: "flex", justifyContent: "end", pt: 2 }}>
            <Button
              variant="outlined"
              color="error"
              sx={{ mr: 2 }}
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenConfirm(true)}
            >
              Convert
            </Button>
          </Box>
          <ModalConfirm
            isOpen={openConfirm}
            toggle={() => setOpenConfirm(!openConfirm)}
            text="Are you sure you want to convert this product?"
            type="confirm"
            handleConfirm={() => handleConvertProduct()}
          />
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalConvertStock;
