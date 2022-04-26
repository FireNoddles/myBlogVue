import Vue from 'vue'
import Router from 'vue-router'
import VueRouter from 'vue-router'
const LoginView = () => import(/* webpackChunkName: "LoginView" */ '../views/login.vue')
const AdminView = () => import(/* webpackChunkName: "AdminView" */ '../views/background.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../components/login.vue')
const ManagerUsers = () => import(/* webpackChunkName: "ManagerUsers" */ '../components/managerUsers.vue')
const ManagerCategory = () => import(/* webpackChunkName: "ManagerCategory" */ '../components/managerCategory.vue')
const managerArticle = () => import(/* webpackChunkName: "ManagerCategory" */ '../components/managerArticle.vue')
Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView,
    meta:{
      requireAuth:"false",
    },
    children: [
      {
        path: 'login',
        name: 'HelloWorld',
        component: Login,
        meta:{
          requireAuth:"false",
        },
      }

    ]
  },
  {
    path: '/admin',
    name: 'adminHome',
    component: AdminView,
    meta:{
      requireAuth:"true",
    },
    children: [
      {
        path: 'managerUsers',
        name: 'managerUsers',
        component: ManagerUsers,
        meta:{
          requireAuth:"true",
        },
      },
      {
        path: 'managerCategory',
        name: 'managerCategory',
        component: ManagerCategory,
        meta:{
          requireAuth:"true",
        },
        
      },
      {
        path: 'managerArticle',
        name: 'managerArticle',
        component: managerArticle,
        meta:{
          requireAuth:"true",
        },
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
export default router

router.beforeEach((to,from,next)=>{
  if(to.meta.requireAuth==="true"){
    const userToken = window.sessionStorage.getItem('token')
    if(userToken){
      next()
    }else{
      next({path:'/login'})
    }
  }else{
    next()
  }
})