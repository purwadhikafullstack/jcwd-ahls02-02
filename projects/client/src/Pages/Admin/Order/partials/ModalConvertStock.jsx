import { Modal, Backdrop, Fade, Box, Grid } from "@mui/material";
import Button from "../../../../Components/atoms/Button";
import Text from "../../../../Components/atoms/Text";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  zIndex: 30,
};

const ModalConvertStock = (props) => {
  const { isOpen, toggle, handleConfirm, type, disabled } = props;

  const handleCloseModal = () => {
    // handleConfirm();
    toggle();
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
          <Box sx={{ pb: 1 }}>
            <Text fontSize="h5" fontWeight="bold" color={"primary"}>
              Convert Unit
            </Text>
          </Box>
          <Box sx={{ py: 2 }}>
            <Text>Product:</Text>
            <Grid container>
              <Grid item xs={12}>
                <Text>Largest Unit:</Text>
                <Text>Stock:</Text>
              </Grid>
              <Grid item xs={12}>
                <Text>Smallest Unit:</Text>
                <Text>Stock:</Text>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", pt: 2 }}>
            <Button
              variant="contained"
              color="success"
              sx={{ mr: 2 }}
              onClick={handleCloseModal}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalConvertStock;
