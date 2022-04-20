import Home from "../views/Home.vue";

export const router = {
    path: "/",
    name: "Home",
    component: Home,
    children: [
        {
            path: "/dashboard",
            name: "dashboard",
            meta: {
                title: '系统首页'
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "@/views/Dashboard.vue")
        },
    ]
}
