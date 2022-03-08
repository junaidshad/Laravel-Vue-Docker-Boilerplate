import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import store from "../state/store";

Vue.use(VueRouter);

const router = new VueRouter({
    history: 'history',
    routes, // short for `routes: routes`
})

export default router;

router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !store.getters['auth/loggedIn']) next({ name: 'login' })
    else if (to.name === 'login' && store.getters['auth/loggedIn']) next({name: from.name})
    else next()
})
