import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Game from "../views/Game.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/game",
    name: "Game View",
    component: Game,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
