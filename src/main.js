import Vue from "vue";

//导入根组件
import App from "./component/App.vue";

new Vue({
    el:'#app',
    render: createElement => createElement(App)
})