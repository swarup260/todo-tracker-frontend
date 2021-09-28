import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";
import { BASE_URL } from "./api/urls";
import { getData } from "./utils/localStorage";
import "@/store/subscribers";

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
    if (error.response && error.response.status == 401) {
      if (!getData("userLogin")) {
        router.push("/");
      }
      store.dispatch("auth/login", getData("userLogin"));
      return axios(error.config);
    }

    return Promise.reject(new Error(error.message));
  }
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
