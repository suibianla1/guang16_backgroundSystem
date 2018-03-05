import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'
import Shortcart from '../component/admin/shopcart/Shopcart.vue'
// import Register from '../component/register/Register.vue'

//导入右侧主题路由组件
import Orderlist from '../component/admin/order/orderlist.vue'


import GoodsList from '../component/admin/goods/list/goodslist.vue'
import GoodsDetail from '../component/admin/goods/detail/goodsDetail.vue'
import GoodsComment from '../component/admin/goods/comment/goodsComment.vue'

Vue.use(Router)

//右侧主体路由配置
var goods=[
    {name:'goodsList', path:'goodslist', component: GoodsList},
    { name: 'goodsDetail', path: 'goodsdetail/:id', component: GoodsDetail},
    { name: 'goodsComment', path: 'goodsComment', component: GoodsComment},
]

var order ={
    name: 'orderlist', path: 'orderlist', component: Orderlist 
}


let router =  new Router({
    //路由配置 
    routes:[
        {name:'login', path:'/login', component:Login},
        
        { name: 'admin', path: '/admin', component: Admin, children: [...goods, order]},
        // {name:'register', path:'/register', component:Register}
    ]
})

//创建全局路由守卫，判断是否登陆，在路由配置之前执行
router.beforeEach((to, from, next)=>{
    Vue.prototype.$axios.get(Vue.prototype.$api.islogin).then((res)=>{
        // console.log(res.data);
        // if (to.name == 'login') {
        //     if (res.data.code == 'logined') {
        //         next()
        //     } else {
        //         next();
        //     }
        // } 

        //如果用户未登录，跳转到登陆页面，登陆过就继续操作
        if (to.name != 'login') {
            if (res.data.code == 'logined') {
                next();
            } else {
                next({ name: 'login' })
            }
        }
    })
})

export default router;