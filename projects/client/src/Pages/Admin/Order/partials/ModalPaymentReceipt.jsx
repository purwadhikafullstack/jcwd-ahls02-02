import { FileUploadRounded } from "@mui/icons-material";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import { API_IMAGE_URL } from "../../../../helper";
// import Button from "../../../Components/atoms/Button";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 300,
    // bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    // p: 4,
    textAlign: 'center'
};

const ModalShowPayment = (props) => {
    const { isOpen, toggle, image } = props

    // const [newDataImage, setNewDataImage] = useState()
    const [newImage, setNewImage] = useState()
    const [openConfirm, setOpenConfirm] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [inputKey, setInputKey] = useState(null);

    return (
        <div>
            {image ?
                <Modal
                    open={isOpen}
                    onClose={toggle}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <img src={`${API_IMAGE_URL}${image}`} alt="payment-proof" style={{ maxWidth: 250, maxHeight: 750 }} />
                    </Box>
                </Modal>
                :
                null
            }
        </div>
    );
}

export default ModalShowPayment;