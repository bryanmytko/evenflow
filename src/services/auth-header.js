const authHeader = () => {
  const token = JSON.parse(localStorage.getItem('token'));

  return (token) ? { Authorization: token } : {};
};

export default authHeader;
