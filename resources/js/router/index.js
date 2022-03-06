import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
Vue.use(VueRouter);

const router = new VueRouter({
    history: 'history',
    routes, // short for `routes: routes`
})


export default router;
