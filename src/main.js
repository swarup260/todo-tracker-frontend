import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { BASE_URL } from "./api/urls";
import { getData } from "./utils/localStorage";
import "@/store/subscribers";
/* Socket.io Setup */
import SocketIO from "socket.io-client";
import VueSocketIOExt from 'vue-socket.io-extended';

/* Set Axios Default Setting */
axios.defaults.baseURL = BASE_URL;

axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function(error) {
    /* Regenerate Token if expired and user credentials */
    if (error.response.status == 401) {
      if (!getData("userLogin")) {
        router.push("/");
      }
      store.dispatch("auth/login", getData("userLogin"));
      return axios(error.config);
    }

    return Promise.reject(error);
  }
);

Vue.config.productionTip = false;

const socket = SocketIO(BASE_URL);
Vue.use(VueSocketIOExt, socket, { store });

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
