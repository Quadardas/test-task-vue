import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createVuestic } from "vuestic-ui";
import "vuestic-ui/css";
import { createPinia } from "pinia";

createApp(App)
  .use(router)
  .use(createPinia())
  .use(createVuestic())
  .mount("#app");
