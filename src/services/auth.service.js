import axios from 'axios';

const BASE_URL = process.env.BASE_URL;

class AuthService {
  async login(email, password) {
    const response = await axios.post(
      `${BASE_URL}/api/auth`,
      {
        email,
        password
      }
    );

    console.log(response);
  }
}

export default AuthService;
