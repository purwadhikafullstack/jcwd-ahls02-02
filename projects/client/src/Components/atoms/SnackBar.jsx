import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function SnackBarStatus(props) {
    const { open, setOpen, message, severity } = props

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={severity}>{message}</Alert>
            </Snackbar>
        </div>
    );
}