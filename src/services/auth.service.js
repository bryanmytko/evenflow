import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

class AuthService {
  async login(email, password) {
    const response = await axios.post(
      `${BASE_URL}/api/auth/login`,
      {
        email,
        password
      }
    );

    localStorage.setItem('token', JSON.stringify(response.data.token));
  }
}

export default new AuthService();
