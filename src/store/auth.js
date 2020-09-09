import axios from 'axios';
import { endpoints } from "../api/urls";
export default ({
  namespaced : true,
  state: {
      token : null,
      users : {}
  },
  mutations: {
  },
  actions: {
    async login( _ , credentials){
     axios.post(endpoints.users.login,credentials).then(res => console.log(res.data));
    }
  }
})
