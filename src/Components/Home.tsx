import React, { useState, useEffect, useCallback } from 'react';
import { Pagination, Typography, Container, CircularProgress, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import UserList from './UserList';
import CreateUser from './CreateUser';
import SnackbarAlert from './SnackbarAlert';
import { deleteUser, getAllUsers } from '../Services/userService';
import { User } from '../types';

// hardcoded company data (in future this should be fetched from user authentication)
const COMPANY_DATA = {
    companyId: 'fbc000fb-300f-4471-bc31-dfb1f0c31a0e',
    companyName: 'Check Point',
};

const Home = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    // Fetch users from the API according to the current page and search term
    const fetchUsers = async (page: number, searchQuery: string = '') => {
        try {
            setIsLoading(true);
            setIsError(false);
            const response = await getAllUsers(page, COMPANY_DATA.companyId, searchQuery || undefined);
            setUsers(response.users);
            setTotalPages(response.totalPages);
            setCurrentPage(response.currentPage);
        } catch (error) {
            console.error("Error fetching users", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch users when the user navigates to a different page
    useEffect(() => {
        fetchUsers(currentPage, searchTerm);
    }, [currentPage]);

    // Fetch users when the search term changes
    useEffect(() => {
        fetchUsers(1, searchTerm);
    }, [searchTerm]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const updateUsers = (newUser: User) => {
        setUsers([...users, newUser]);
    };

    const handleDeleteUser = async (id: string) => {
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user._id !== id));
            setSnackbar({ open: true, message: 'User deleted successfully!', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Error deleting user.', severity: 'error' });
            console.error("Error deleting user");
        }
    }

    return (
        <div className="all background-img home">
            <Container maxWidth="lg" sx={{ my: 3 }}>
                <div className="header">
                    <Typography variant="h4" className="companyName">
                        {COMPANY_DATA.companyName} Users
                    </Typography>
                    <div className="headerControls">
                        <CreateUser updateUsers={updateUsers} companyId={COMPANY_DATA.companyId} />
                        <TextField
                            label="Search users by name"
                            variant="outlined"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="searchInput"
                        />
                    </div>
                </div>
                {isLoading ? (
                    <div className="loading">
                        <CircularProgress size={60} style={{ color: "white" }} />
                    </div>
                ) : isError || users.length === 0 ? (
                    <div className="noData">
                        <PersonIcon className="noDataIcon" />
                        <Typography variant="h5">No Data Available</Typography>
                        <Typography variant="body1">
                            No users found or an error occurred while fetching data.
                        </Typography>
                    </div>
                ) : (
                    <UserList users={users} handleDeleteUser={handleDeleteUser} />
                )}

                <div className="paginationWrapper">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(_, page) => setCurrentPage(page)}
                        className="pagination"
                    />
                </div>
                <SnackbarAlert open={snackbar.open} message={snackbar.message} severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} />
            </Container>
        </div>
    );
};
export default React.memo(Home);