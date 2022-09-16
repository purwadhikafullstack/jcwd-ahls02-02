import { FileUploadRounded } from "@mui/icons-material";
import { Avatar, Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import ModalConfirm from "../../../Components/ModalConfirm";
// import Button from "../../../Components/atoms/Button";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center'
};

const ModalUploadPayment = (props) => {
    const { isOpen, toggle, handleSubmit, setPaymentProof } = props

    // const [newDataImage, setNewDataImage] = useState()
    const [newImage, setNewImage] = useState()
    const [openConfirm, setOpenConfirm] = useState(false)
    const [disableButton, setDisableButton] = useState(false)

    const handleUpload = (e) => {
        setPaymentProof(e.target.files[0])
        console.log(e.target.files[0])
        let files = e.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            setNewImage(e.target.result)
        }
    }

    const handleCancel = () => {
        setPaymentProof()
        setNewImage()
        toggle();

    }

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleCancel}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                {newImage ?
                    <Box sx={style}>
                        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                            Upload your payment proof
                        </Typography>
                        <img src={newImage} alt="payment-proof" style={{ maxWidth: 250, maxHeight: 750 }} />
                        <Button
                            variant="text"
                            component="label"
                            // color="error"
                            sx={{ mt: 2 }}
                            startIcon={<FileUploadRounded />}
                        >
                            Upload New Image
                            <input
                                type="file"
                                hidden
                                onChange={(e) => handleUpload(e)}
                            />
                        </Button>
                        <Box display="flex" sx={{ justifyContent: 'flex-end', mt: 3 }}>
                            <Button variant="outlined" color="error" size="small" sx={{ mr: 2 }} onClick={handleCancel}>Cancel</Button>
                            <Button variant="contained" color="primary" size="small" onClick={() => setOpenConfirm(true)} disabled={disableButton}>Submit</Button>
                        </Box>
                    </Box>
                    :
                    <Box sx={style}>
                        <Box display='flex' sx={{ justifyContent: 'center', mb: 2 }}>
                            <Avatar src="https://static.vecteezy.com/system/resources/thumbnails/006/657/739/small_2x/payment-receipt-with-coin-cartoon-illustration-flat-isolated-object-free-vector.jpg" alt="Payment Logo" sx={{ width: 100, height: 100 }} />
                        </Box>
                        <Typography variant="h6" component="h2">
                            Upload your payment proof
                        </Typography>
                        <Typography variant="subtitle2" fontSize="13px" color="grey.600" sx={{ mb: 2 }}>
                            We need to confirm your payment before we can process your order
                        </Typography>
                        <Button
                            variant="text"
                            component="label"
                            sx={{ mt: 2 }}
                            startIcon={<FileUploadRounded />}
                        >
                            Upload
                            <input
                                type="file"
                                hidden
                                onChange={(e) => handleUpload(e)}
                            />
                        </Button>
                    </Box>
                }
            </Modal>
            <ModalConfirm
                isOpen={openConfirm}
                toggle={() => setOpenConfirm(!openConfirm)}
                text='Are you sure you have uploaded the right image? Once you upload, you cannot change'
                type='confirm'
                handleConfirm={() => {
                    handleSubmit()
                    handleCancel()
                }}
            />
        </div>
    );
}

export default ModalUploadPayment;