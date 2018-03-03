<template>
    <div class="header">
        <span class="menuicon">
            <i class="el-icon-menu"></i>
        </span>
        <el-dropdown trigger="click" @command="handleCommand">
            <span class="el-dropdown-link">
                你好,{{admin}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">修改密码</el-dropdown-item>
                <el-dropdown-item command="b">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown> 
    </div>
</template>

<script>
    export default {
        data(){
            return{
                admin : localStorage.getItem("uname")
            }
        },
        methods: {
            logout(){
                this.$axios.get(this.$api.logout).then(res=>{
                    if (res.data.status == 0) {
                        this.$router.push({name:'login'});
                    }
                });
            },
            handleCommand(command) {
                if (command == 'a') {
                    
                }else{
                    this.logout();
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .header{
        text-align: right;
        span{
            cursor: pointer;
        }
        .menuicon{
            float: left;
            width: 40px;
            i{
                line-height: 60px;
                font-size: 40px;
                color: #666;
            }
        }
    }
    
</style>