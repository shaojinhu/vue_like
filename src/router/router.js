
import home from '../views/public/home.vue'  //首页
import login from '../views/public/login.vue'

export default [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home
    }
  ]