import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { createStore } from "./stores/store";
import * as DataService from "./data_service";

DataService.getSession().then((sessionData) => {
  const app = createApp(App);
  app.use(createStore(sessionData));
  app.use(router);

  app.mount("#app");
});
