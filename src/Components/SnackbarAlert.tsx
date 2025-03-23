import React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarAlertProps {
    open: boolean;
    message: string;
    severity: 'success' | 'error';
    onClose: () => void;
}

const SnackbarAlert = ({ open, message, severity, onClose }: SnackbarAlertProps) => {
    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default React.memo(SnackbarAlert);
