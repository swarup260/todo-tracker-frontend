import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import { getData } from "../utils/localStorage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
  },
  {
    path: "/checklist",
    name: "Checklist",
    component: () => import("../views/CheckList.vue"),
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("../views/Projects.vue"),
  },
  {
    path: "/project/:id",
    name: "project",
    component: () => import("../views/Project.vue"),
  },
  {
    path: "/dragtodo",
    name: "DragTodo",
    component: () => import("../views/TodoDrag.vue"),
  },
  {
    // will match everything
    path: "*",
    component: () => import("../views/404.vue"),
  },
];
// https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
const router = new VueRouter({
  mode: "history",
  routes: routes,
});

// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
router.beforeEach((to, from, next) => {
  if (to.name == "Dashboard" && getData("token") == null) {
    return next({
      name: "Home",
    });
  }
  if ((to.name == "Home" || to.name == "SignUp") && getData("token")) {
    return next({
      name: "Dashboard",
    });
  }
  return next();
});

export default router;
