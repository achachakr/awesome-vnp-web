import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

createApp(App)
  .use(router) // ⬅⬅⬅ 반드시 필요
  .mount("#app");
