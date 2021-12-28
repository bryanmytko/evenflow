import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

class AuthService {
  currentUser() {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }

  async login(email, password) {
    const response = await axios.post(
      `${BASE_URL}/api/auth/login`,
      {
        email,
        password
      }
    );

    localStorage.setItem('token', JSON.stringify(response.data.token));
    window.location.reload();
  }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}

export default new AuthService();
