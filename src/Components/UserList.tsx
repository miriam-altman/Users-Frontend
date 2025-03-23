import React from 'react';
import { Typography, Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import { User } from '../types';

interface UserListProps {
    users: User[];
    handleDeleteUser: (id: string) => void;
}

const UserList = ({ users, handleDeleteUser }: UserListProps) => {
    return (
        <div className="userList">
            {users.map(user => (
                <Card className="card" key={user._id}>
                    <CardContent className="cardContent">
                        <div className="iconWrapper">
                            <PersonIcon className="personIcon" />
                            <div>
                                <Typography variant="body1" className="userData">
                                    {user.firstName} {user.lastName}
                                </Typography>
                                <Typography variant="body2">{user.email}</Typography>
                            </div>
                        </div>
                        <IconButton onClick={() => handleDeleteUser(user._id)} className="iconButton">
                            <DeleteIcon />
                        </IconButton>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default React.memo(UserList);
