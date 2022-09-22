import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Search from '@/components/Search'
import Result from '@/components/Result'
import Loading from '@/components/Loading'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/result',
      name: 'Result',
      component: Result
    },
    {
      path: '/loading',
      name: 'Loading',
      component: Loading
    },
  ]
})
