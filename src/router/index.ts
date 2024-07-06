import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import OfficeItem from "@/components/OfficeItem.vue";
import OfficeView from "@/views/OfficeView.vue";
import WorkplaceView from "@/views/WorkplaceView.vue";
import AdminView from "@/views/AdminView.vue";
import Login from "@/views/Login.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "main",
    component: HomeView,
  },
  {
    path: "/office/:id",
    name: "office",
    component: OfficeView,
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminView,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
