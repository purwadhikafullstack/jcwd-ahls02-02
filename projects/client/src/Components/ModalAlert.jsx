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
  zIndex: 30,
};

const ModalAlert = (props) => {
  const { children, isOpen, toggle, handleConfirm, type, disabled } = props;

  const handleCloseModal = () => {
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
                type === "success"
                  ? "primary"
                  : type === "error"
                  ? "error"
                  : null
              }
            >
              Notification
            </Text>
          </Box>
          <Box sx={{ py: 2 }}>
            <Text>{children}</Text>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "end", pt: 2 }}>
            <Button
              variant="contained"
              color={
                type === "success"
                  ? "primary"
                  : type === "error"
                  ? "error"
                  : null
              }
              width="100%"
              sx={{ mr: 2 }}
              onClick={handleCloseModal}
            >
              {type === "success"
                ? "Continue"
                : type === "error"
                ? "Close"
                : null}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalAlert;
