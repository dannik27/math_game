import { createWebHistory, createRouter } from "vue-router";
import Menu from "@/components/Menu.vue";
import Game from "@/components/Game.vue";
import Report from "@/components/Report.vue";
import Statistics from "@/components/Statistics.vue";

const routes = [
  {
    path: "/",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/game/:gameMode",
    name: "Game",
    component: Game,
    props: true
  },
  {
    path: "/report",
    name: "Report",
    component: Report,
  },
  {
    path: "/statistics",
    name: "Statistics",
    component: Statistics,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;