// auth.js
export const isAuthenticated = () => {
  // Check if the user has a valid JWT token
  const token = localStorage.getItem("token");
  return !!token;
};

export default isAuthenticated;
