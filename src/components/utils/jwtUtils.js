// Change this line

let jwtDecode;

(async () => {
  jwtDecode = (await import('jwt-decode')).default;
})();
// The rest of your code remains the same
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
