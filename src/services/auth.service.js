import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class AuthService {
  currentUser() {
    const token = localStorage.getItem('token');
    if(!token) return false;
    const { exp } = JSON.parse(atob(token.split('.')[1]));

    return (exp * 1000 < Date.now()) ? false : true;
  }

  async login(email, password) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/login`,
        {
          email,
          password
        }
      );

      localStorage.setItem('token', JSON.stringify(response.data.token));
      return response;
    } catch(err) {
      return { error: err };
    }
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  async signup(email, password) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/signup`,
        {
          email,
          password
        }
      );

      localStorage.setItem('token', JSON.stringify(response.data.token));
      return response;
    } catch(error) {
      if(error.response.data.error.keyValue.email) return { error: 'Email already exists!' };
      return { error: 'Something went wrong.' };
    }
  }
}

export default new AuthService();
