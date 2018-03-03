import Vue from 'vue'

import App from './component/App.vue'
import Router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import './less/index.less'

import axios from 'axios' // 不是vue插件，导入之后只能在当前模块使用
import api, {domain} from './js/api.js' //domain是api的域名

//设置默认域名
axios.defaults.baseURL = domain
// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
axios.defaults.withCredentials = true;

//将axios模块设置到vue的原型方法后其他模块不用引入既可以使用了
Vue.prototype.$axios = axios
Vue.prototype.$api = api

Vue.use(ElementUI)

// this.$axios.get(Vue.prototype.$api.logout).then(() => console.log('logout'))

new Vue({
    el:'#app',
    render: app => app(App),
    router:Router
})