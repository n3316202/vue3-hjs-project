import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'LottoMainView',
    meta: { title: '로또' },
    component: () => import(/* webpackChunkName: "lottomainview" */ '../views/LottoMainView.vue')
  },
  {
    path: '/rsp',
    name: 'RspMainView',
    meta: { title: '가위바위보' },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "rspmainview" */ '../views/RspMainView.vue')
  },
  {
    path: '/job',
    name: 'JobMainView',
    meta: { title: 'JobList' },
    component: () => import(/* webpackChunkName: "jobmainview" */ '../views/JobMainView.vue')
  },
  {
    path: '/board',
    name: 'BoardMainView',
    meta: { title: '게시판' },
    component: () => import(/* webpackChunkName: "boardmainview" */ '../views/BoardMainView.vue')
  },
  {
    path: '/board/:id',
    name: 'BoardRead',
    component: () => import(/* webpackChunkName: "boardread" */ '../components/board/BoardStoreRead.vue')
  }
]

function contextPath() {
  let count = window.location.pathname.replace('/', '').split('/').length - 1

  //let count = '/hjs/'.replace('/', '').split('/').length - 1

  console.log(window.location.pathname.replace('/', '').split('/') + '====' + count)

  if (count > 0) {
    routes.forEach(function (route) {
      route.path = '/' + window.location.pathname.replace('/', '').split('/')[0] + route.path
      console.log(route.path)
    })
  }
  return routes
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: contextPath()
})

export default router
