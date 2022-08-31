import { Modal, Backdrop, Fade, Box } from "@mui/material";
import Button from "./atoms/Button";
import Text from "./atoms/Text";

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
  zIndex: 30
};

const ModalConfirm = (props) => {
  const { isOpen, toggle, text, type, handleConfirm, disabled } = props;

  const handleCloseModal = () => {
    toggle();
  };

  const handleButtonCancel = () => {
    toggle();
  };

  const handleButtonConfirm = () => {
    handleConfirm();
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
            <Text
              fontSize="h5"
              fontWeight="bold"
              color={
                type === "warning" ? "error" : type === "confirm" && "primary"
              }
            >
              {type === "warning" ? "Warning" : type === "confirm" && "Confirm"}
            </Text>
          </Box>
          <Box sx={{ py: 2 }}>
            <Text>{text}</Text>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", pt: 2 }}>
            <Button
              variant={
                type === "warning"
                  ? "contained"
                  : type === "confirm" && "outlined"
              }
              color="error"
              width="100px"
              sx={{ mr: 2 }}
              onClick={handleButtonCancel}
            >
              Cancel
            </Button>
            <Button
              variant={
                type === "warning"
                  ? "outlined"
                  : type === "confirm" && "contained"
              }
              color="primary"
              width="100px"
              onClick={handleButtonConfirm}
              disabled={disabled ? disabled : false}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalConfirm;
