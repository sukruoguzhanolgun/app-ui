import { createApp } from "vue";
import { init } from "@/core/vue/startup";
// eslint-disable-next-line import/no-extraneous-dependencies
import { createPinia } from "pinia";
// eslint-disable-next-line import/no-extraneous-dependencies
import Toast, { PluginOptions } from "vue-toastification";
import App from "./core/vue/App.vue";
import router from "./core/router";
import "./core/vue/app.css";
// eslint-disable-next-line import/no-extraneous-dependencies
import "vue-toastification/dist/index.css";

init();

const filterBeforeCreate = (toast: any, toasts:any[]) => {
  if (toasts.filter((t) => t.type === toast.type).length !== 0
    && toasts.filter((t) => t.message === toast.message).length !== 0) {
    return false;
  }
  return toast;
};

const toastOptions: PluginOptions = {
  transition: "Vue-Toastification__fade",
  maxToasts: 20,
  newestOnTop: true,
  filterBeforeCreate,
};

const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .use(Toast, toastOptions)
  .mount("#app");
