import Home from "../views/Home.vue";

export const router = {
    path: "/collection_product_manage",
    name: "CollectionProductManage",
    component: Home,
    children: [
        {
            path: "/collection_product_list",
            name: "CollectionProductList",
            meta: {
                title: '采集产品管理',
                icon: "el-icon-lx-home",
            },
            component: () => import ( /* webpackChunkName: "dashboard" */ "@/views/coolectionProduct/productList.vue")
        },
    ]
}
