import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  mode: "hash",
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "默认路径",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "登录",
      component: () => import('@/views/Login.vue'),
    },
    {
      path: "/main",
      redirect: "/chat",
      name: "主窗口",
      component: () => import('@/views/main.vue'),
      children:[
        {
          path:'/chat',
          name:'聊天',
          component: () => import('@/views/chat/Chat.vue'),
        }
        
      ]
    }
  ]
})
export default router
