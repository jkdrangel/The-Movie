import Router from 'vue-router'
import List from './components/List'
import Movie from './components/Movie'

const routes = [
  {
    path: '*',
    redirect: { name: 'list' }
  },
  {
    path: '/',
    alias: '/list',
    component: List,
    name: 'list'
  },
  {
    path: '/movie/:id',
    component: Movie,
    name: 'movie'
  }
]

const router = new Router({
  routes,
  mode: 'history'
})

export default router
