import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = process.env.BASE_URL;

class UserService {
  getNodes() {
    return axios.get(`${BASE_URL}/api/node`, { headers: authHeader() });
  }

  getNode(id) {
    return axios.get(`${BASE_URL}/api/node/${id}`, { headers: authHeader() });
  }
}

export default new UserService();
