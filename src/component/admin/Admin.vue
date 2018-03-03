<template>
    <el-container>
    <el-aside width="180px">
        <app-aside></app-aside>
    </el-aside>
    <el-container>
        <el-header>
            <app-header></app-header>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
  </el-container>
</el-container>

</template>

<script>
    import Header from './subcom/Header.vue';
    import Aside from './subcom/Aside.vue';

    export default {
        //注册子组件
        components: {
            appHeader : Header,
            appAside: Aside
        }
    }
</script>

<style scoped lang="less">
    .el-container{
        height: 100%;
        color: #333;
        .el-header{
            line-height: 60px;
            background-color: #fafafa;
        }
        .el-aside{
            background-color:#409eff; 
        }
        .el-main{
            padding:15px;
        }
    }
</style>