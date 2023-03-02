import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'LottoMainView',
    component: () => import(/* webpackChunkName: "lottomainview" */ '../views/LottoMainView.vue')
  },
  {
    path: '/rsp',
    name: 'RspMainView',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "rspmainview" */ '../views/RspMainView.vue')
  },
  {
    path: '/job',
    name: 'JobMainView',
    component: () => import(/* webpackChunkName: "jobmainview" */ '../views/JobMainView.vue')
  },
  {
    path: '/board',
    name: 'BoardMainView',
    component: () => import(/* webpackChunkName: "boardmainview" */ '../views/BoardMainView.vue')
  },
  {
    path: '/board/:id',
    name: 'BoardRead',
    component: () => import(/* webpackChunkName: "boardread" */ '../components/board/BoardRead.vue')
  }
]

// path: "/detail/:id",
// component: Detail,

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
