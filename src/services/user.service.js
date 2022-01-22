import axios from 'axios';
import authHeader from './auth-header';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class UserService {
  getNodes() {
    return axios.get(`${BASE_URL}/api/node`, { headers: authHeader() });
  }

  getNode(id) {
    return axios.get(`${BASE_URL}/api/node/${id}`, { headers: authHeader() });
  }

  getNodeSlug(slug) {
    return axios.get(`${BASE_URL}/api/node/slug/${slug}`, { headers: authHeader() });
  }

  getNodeChildren(id) {
    return axios.get(`${BASE_URL}/api/node/children/${id}`, { headers: authHeader() });
  }

  updatePrivate(id) {
    return axios.put(`${BASE_URL}/api/node/private/${id}`,
      {},
      { headers: authHeader() }
    ).then(res => {
      return res;
    }).catch(err => {
      console.log(err);
    });
  }

  updateNode({ id, title, payload }) {
    return axios.put(`${BASE_URL}/api/node/update/${id}`,
      { title, payload },
      { headers: authHeader() }
    ).then(res => {
      return res;
    }).catch(err => {
      console.log(err);
    });
  }

  deleteNode(id) {
    return axios.delete(`${BASE_URL}/api/node/delete/${id}`, { headers: authHeader() });
  }

  createNode({ title, parentId, payload }) {
    return axios.post(`${BASE_URL}/api/node/create`,
      { title, parentId, payload },
      { headers: authHeader() }
    ).then(res => {
      return res;
    }).catch(err => {
      console.error(err);
    });
  }
}

export default new UserService();
