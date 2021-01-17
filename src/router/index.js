import Vue from "vue";
import VueRouter from "vue-router";
//import Home from '../views/Home.vue'
import Globals from "../components/utils/globals.js";
import Home from "../components/Home";
import cliente_info from "../components/pages/cliente_info/cliente_info.vue";
Vue.use(VueRouter);

Vue.prototype.$globals = new Globals({ myuid: "pepe", actualpage: "start" });

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true,
  },
  {
    path: "/ventas",
    name: "ventas",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ "../components/pages/ventas/ventas.vue"
      ),
  },
  {
    path: "/importexport",
    name: "importexport",
    component: () =>
      import("../components/pages/import_export/import_export.vue"),
  },
  {
    path: "/cliente_info",
    name: "cliente_info",
    component: cliente_info,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
