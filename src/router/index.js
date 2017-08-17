import Vue from 'vue'
import Router from 'vue-router'
import Goods from '../components/goods/goods'
import Ratings from '../components/ratings/ratings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Goods
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    }
  ]
})
