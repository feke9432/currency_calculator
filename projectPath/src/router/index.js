import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import CalPage from '@/components/CalPage'
import ChkDriverLoc from '@/components/ChkDriverLoc'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [{
        path: 'calpage',
        component: CalPage
      },{
        path: 'chkdriverloc',
        component: ChkDriverLoc
      }]
    }
  ]
})
