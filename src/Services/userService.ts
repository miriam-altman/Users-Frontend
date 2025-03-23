import axios from 'axios';
import { NewUser, User } from '../types';

const API_URL = 'https://localhost:5000/users';

export const getAllUsers = async (page: number, companyId: string, searchQuery?: string): Promise<{ users: User[]; totalPages: number, currentPage: number }> => {
    try {
        const response = await axios.get(`${API_URL}`, {
            params: { page, limit: 10, companyId, searchQuery }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Error fetching users');
    }
};

export const checkUserExists = async (email: string, companyId: string): Promise<{ isExists: boolean; user?: any }> => {
    try {
        const response = await axios.get(`${API_URL}/exists`, { params: { email, companyId } });
        return response.data;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw new Error('Error checking user existence');
    }
};

export const createUser = async (user: NewUser): Promise<User> => {
    try {
        const response = await axios.post(API_URL, user);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
    }
};

export const deleteUser = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw new Error('Error deleting user');
    }
};