import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GameView from '../views/GameView.vue';
import CategoryView from '../views/CategoryView.vue';
import UserAuth from '../views/UserAuth.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/game',
        name: 'Game View',
        component: GameView
    },
    {
        path: '/categories',
        name: 'Categories',
        component: CategoryView
    },
    {
        path: '/auth',
        name: 'Auth',
        component: UserAuth
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
