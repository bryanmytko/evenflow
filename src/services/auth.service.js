import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class AuthService {
  currentUser() {
    const token = localStorage.getItem('token');
    return token ? true : false;
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
      console.log('Error:', err);
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
    } catch(err) {
      console.log('Error signing up.');
    }
  }
}

export default new AuthService();
