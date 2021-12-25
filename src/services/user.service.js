import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = process.env.BASE_URL;

class UserService {
  getNodes() {
    return axios.get(`${BASE_URL}/nodes`, { headers: authHeader() });
  }

  getNode(id) {
    return axios.get(`${BASE_URL}/nodes/${id}`, { headers: authHeader() });
  }
}

export default new UserService();
