import { createRouter, createWebHistory } from "vue-router";
import MockupView from "@src/views/Mockup.vue";

// Async Component
const VAbout = () => import("@src/views/About.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: MockupView
  },
  {
    path: "/about",
    name: "about",
    component: VAbout
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;