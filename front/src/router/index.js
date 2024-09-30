import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import HomeView from "../views/HomeView.vue";
import Cookies from "js-cookie";

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: HomeView,
    beforeEnter: (to, from, next) => {
      const user = Cookies.get("userId");
      if (!user) {
        next("/");
      } else {
        next();
      }
    },
  },
  {
    path: "/",
    name: "Login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
