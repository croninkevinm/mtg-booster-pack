import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Pack from '../views/Pack.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/open-pack/:setCode',
    name: 'Pack',
    component: Pack,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
