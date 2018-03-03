import Vue from 'vue'
import Router from 'vue-router'

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
    { name: 'goodsDetail', path: 'goodsDetail/:id', component: GoodsDetail},
    { name: 'goodsComment', path: 'goodsComment', component: GoodsComment},
]

var order ={
    name: 'orderlist', path: 'orderlist', component: Orderlist 
}

export default new Router({
    routes:[
        {name:'login', path:'/login', component:Login},
        
        { name: 'admin', path: '/admin', component: Admin, children: [...goods, order]},
        // {name:'register', path:'/register', component:Register}
    ]
})