<template>
<div>
    <img src="../../../imgs/下载.png" alt="">
    <el-col :span="24">
        <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#409eff"
        text-color="#fff"
        active-text-color="#fff"
        :unique-opened='isOpen'>
            <el-submenu v-for="(item, index) in menu" :key="index" :index="item.title">
                <template slot="title">
                    <i class="el-icon-message"></i>
                <span>{{item.title}}</span>
                </template>
                    <el-menu-item :index="inItem.text" v-for="inItem in item.submenu" :key="inItem.text">
                        <router-link :to="inItem.path">
                            <i class="el-icon-document"></i>
                            <span>{{inItem.text}}</span>
                        </router-link>
                    </el-menu-item>
            </el-submenu>
        </el-menu>
  </el-col>
</div>
    
</template>

<script>
    export default {
        data(){
            return {
                activeName: '1',
                isOpen:true,
                 menu: [
                    { title: '学员问题', submenu:
                        [
                            { text: '内容管理', path: '/admin/questionarticlelist' },
                            { text: '类别管理', path: '/admin/questioncatelist' },
                            { text: '评论管理', path: '/admin/questioncatelist' },
                        ]
                    },
                    { title: '前端技术', submenu:
                        [
                            { text: '内容管理', path: '/admin/commonarticlelist' },
                            { text: '类别管理', path: '/admin/commoncatelist' },
                            { text: '评论管理', path: '/admin/commoncatelist' },
                        ]
                    },
                    { title: '难点答疑', submenu:
                        [
                            { text: '内容管理', path: '/admin/pointarticlelist' },
                            { text: '类别管理', path: '/admin/pointcatelist' },
                            { text: '评论管理', path: '/admin/pointcatelist' },
                        ]
                    },
                    { title: '资源下载', submenu:
                        [
                            { text: '内容管理', path: '/admin/downarticlelist' },
                            { text: '类别管理', path: '/admin/downcatelist' },
                            { text: '评论管理', path: '/admin/downcatelist' },
                        ]
                    },
                    { title: '商品管理', submenu:
                        [
                            { text: '内容管理', path: '/admin/goodslist' },
                            { text: '类别管理', path: '/admin/goodsdetail' },
                            { text: '评论管理', path: '/admin/goodscomment' },
                        ]
                    },
                    { title: '订单管理', submenu:
                        [
                            { text: '订单列表', path: '/admin/orderlist' },
                        ]
                    }
                ]
            };
        },
        methods: {
            
        }
    }
</script>

<style scoped lang="less">
    .el-aside{
        overflow: hidden;
        height: 100%;
        text-align: center;
        img{
            display: block;
        }
        .el-submenu__title i{
            color:#fff;
        }

        .el-menu-vertical-demo{
            .el-submenu{
                .el-submenu__title i{
                    color: #fff;
                }
            }
        }
        
        .el-submenu__title{
            color: #fff;
        }

        .el-menu {
            border-right: 0;
            .el-menu--inline{
                a{
                    .el-icon-document{
                        color: #fff;
                    }
                }
            }
            // 去掉导航列表的最小宽度限制
            &-item {
                min-width: 0;
            }
        }
    }

</style>