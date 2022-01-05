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

  getNodeChildren(id) {
    return axios.get(`${BASE_URL}/api/node/children/${id}`, { headers: authHeader() });
  }
 
  createNode({ title }) {
    return axios.post(`${BASE_URL}/api/node/create`,
      { title },
      { headers: authHeader() }
    ).then(res => {
      // Notify user here
      console.log('Response: ', res);
    }).catch(err => {
      // Do something with this
      console.error(err);
    });
  }
}

export default new UserService();
