import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CheckStatus from '../views/CheckStatus.vue'
import GetListID from '../views/GetListID.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/check-status',
    name: 'check-status',
    component: CheckStatus,
  },
  {
    path: '/get-list-ID',
    name: 'get-list-ID',
    component: GetListID
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
