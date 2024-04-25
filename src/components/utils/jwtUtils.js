import { decode as jwtDecode } from 'jwt-decode';

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded = jwtDecode(token); 
    return decoded.userId;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
