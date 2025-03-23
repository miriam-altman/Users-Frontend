import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert, Box, Paper } from '@mui/material';
import { checkUserExists, createUser } from '../Services/userService';
import SnackbarAlert from './SnackbarAlert';
import { User } from '../types';

interface CreateUserProps {
    updateUsers: (user: User) => void;
    companyId: string;
}

const CreateUser = ({ updateUsers, companyId }: CreateUserProps) => {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [verifyEmail, setVerifyEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [error, setError] = useState<string>('');
    const [submitted, setSubmitted] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

    useEffect(() => {
        if (open) {
            setFirstName('');
            setLastName('');
            setEmail('');
            setVerifyEmail('');
            setPassword('');
            setVerifyPassword('');
            setError('');
            setSubmitted(false);
        }
    }, [open]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!firstName || !lastName || !email || !verifyEmail || !password || !verifyPassword) {
            return;
        }

        if (email !== verifyEmail) {
            return;
        }

        if (password !== verifyPassword) {
            return;
        }

        // Check if user already exists before creating according uniqe fields - email and companyId
        try {
            const response = await checkUserExists(email, companyId);
            if (response.isExists) {
                setSnackbar({ open: true, message: 'User already exists!', severity: 'error' });
                setOpen(false);
                return;
            }
        } catch (error) {
            console.error('Error checking user existence:', error);
            setSnackbar({ open: true, message: 'Error creating user. Please try again.', severity: 'error' });
            setOpen(false);
            return;
        }

        const newUser = { firstName, lastName, email, password, companyId };
        try {
            const createdUser = await createUser(newUser);
            updateUsers(createdUser);
            setSnackbar({ open: true, message: 'User created successfully!', severity: 'success' });
        } catch (error) {
            console.error('Error creating user:', error);
            setSnackbar({ open: true, message: 'Error creating user. Please try again.', severity: 'error' });

        }

        setOpen(false);
    };

    return (
        <Box className="createUserWrapper">
            <Button className="createBotton" onClick={() => setOpen(true)}>
                Create New User
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle className="dialogTitle">Create New User</DialogTitle>
                <DialogContent>
                    <Paper className="dialogPaper">
                        <Box className="formBox">
                            <TextField
                                label="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                                error={submitted && !firstName}
                                helperText={submitted && !firstName && 'First name is required'}
                                className={submitted && !firstName ? 'errorField' : ''}
                            />
                            <TextField
                                label="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                                error={submitted && !lastName}
                                helperText={submitted && !lastName && 'Last name is required'}
                                className={submitted && !lastName ? 'errorField' : ''}
                            />
                            <TextField
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                                error={submitted && !email}
                                helperText={submitted && !email && 'Email is required'}
                                className={submitted && !email ? 'errorField' : ''}
                            />
                            <TextField
                                label="Verify Email"
                                value={verifyEmail}
                                onChange={(e) => setVerifyEmail(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                                error={submitted && verifyEmail !== email}
                                helperText={submitted && verifyEmail !== email && 'Emails do not match'}
                                className={submitted && verifyEmail !== email ? 'errorField' : ''}
                            />
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                                error={submitted && !password}
                                helperText={submitted && !password && 'Password is required'}
                                className={submitted && !password ? 'errorField' : ''}
                            />
                            <TextField
                                label="Verify Password"
                                type="password"
                                value={verifyPassword}
                                onChange={(e) => setVerifyPassword(e.target.value)}
                                fullWidth
                                required
                                margin="normal"
                                error={submitted && verifyPassword !== password}
                                helperText={submitted && verifyPassword !== password && 'Passwords do not match'}
                                className={submitted && verifyPassword !== password ? 'errorField' : ''}
                            />
                            {error && (
                                <Box className="errorBox">
                                    <p>{error}</p>
                                </Box>
                            )}
                        </Box>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button className="cancelButton" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button className="submitButton" onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            <SnackbarAlert open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} />

        </Box>
    );
};

export default React.memo(CreateUser);
