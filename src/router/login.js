export const router = {
    path: "/login",
    name: "Login",
    meta: {
        title: '登录',
        hidden: true
    },
    component: () => import ( /* webpackChunkName: "login" */ "@/views/login/Login.vue")
}

