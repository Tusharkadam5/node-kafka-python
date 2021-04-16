import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/';

class UserService {


  getUserBoard() {
    return axios.get(API_URL + 'users', {  params: {
      page: 0,
      size:10
    }, headers: authHeader() });
  }

}

export default new UserService();
