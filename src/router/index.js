import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      alias: '/notebooks',//别名
      component: () => import('@/components/NotebookList')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login')
    },

    {
      path: '/note',
      component: () => import('@/components/NoteDetail')
    },
    {
      path: '/trash',
      component: () => import('@/components/TrashDetail')
    }
  ]
})
