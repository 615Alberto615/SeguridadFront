import * as jwt_decode from 'jwt-decode';

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const decoded = jwt_decode(token); 
    return decoded.userId;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
