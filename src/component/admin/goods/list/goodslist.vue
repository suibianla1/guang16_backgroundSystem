<template>
    <div class="list">
        <!-- 导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 操作按钮 -->
        <div class="list_btns">
            <el-button plain size="mini" icon="el-icon-plus">新增</el-button>
            <el-button plain size="mini" icon="el-icon-check" @click="checkAll">全选</el-button>
            <el-button plain size="mini" icon="el-icon-close" @click="del">删除</el-button>

            <div class="list_search">
                <el-input placeholder="请输入内容" v-model="searchvalue" size="mini" @blur="searchByKeyWord">
                    <i slot="prefix" class="el-input__icon el-icon-search" ></i>
                </el-input>
            </div>
        </div>
        <!-- 列表 -->
        <!-- selection-change 当选择项发生变化时会触发该事件 -->
        <el-table :data="tableData3" height="420" border style="width: 100%" @selection-change="change"> 
            <el-table-column type="selection" width="55" >
            </el-table-column>
            <el-table-column label="标题" width="407" >
                <!-- slot-scope属性可以用来循环得到的数据 -->
                <!-- template自定义表格中内容 -->
                <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark"  placement="right">
                        <router-link :to="'goodsdetail/'+scope.row.id" >{{scope.row.title}}</router-link>
                        <div slot="content">
                            <p>商品货号：{{scope.row.goods_no}}</p>
                            <img width="180" :src="scope.row.imgurl" alt="" >
                        </div>
                    </el-tooltip>
                </template>   
            </el-table-column>
            <el-table-column prop="categoryname" label="所属类别" width="150">
            </el-table-column>
            <el-table-column prop="stock_quantity" label="库存" width="90">
            </el-table-column>
            <el-table-column prop="market_price" label="市场价" width="90">
            </el-table-column>
            <el-table-column prop="sell_price" label="销售价" width="90">
            </el-table-column>
            <el-table-column label="属性" width="170">
                <template slot-scope="scope">
                    <i :class="['el-icon-picture', scope.row.is_slide == 1? 'active':'']"></i>
                    <i :class="['el-icon-upload', scope.row.is_top == 1? 'active':'']"></i>
                    <i :class="['el-icon-star-on', scope.row.is_hot == 1? 'active':'']"></i>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <router-link :to="'goodsdetail/'+scope.row.id" >修改</router-link>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[2, 4, 6, 8]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalcount">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                tableData3: [],
                pageIndex:1,
                pageSize:2,
                searchvalue:'',
                totalcount:0,
                selection:[]
            }       
        },
        methods:{
            getGoodsList(){
                this.$axios.get(this.$api.gsList + "?pageIndex="+this.pageIndex+"&pageSize="+this.pageSize+"&searchvalue="+this.searchvalue).then(res=>{
                    this.tableData3 = res.data.message;
                    this.totalcount =res.data.totalcount;
                })
                
            },

            //搜索
            searchByKeyWord(){
                this.getGoodsList()
            },

            change(selection){
                //selection包含了被选择的对像
                this.selection = selection;
            },

            //删除
            del(){
                //map函数，遍历数组，并返回操作结果[数组]
                let ids = this.selection.map( v => v.id);
                //确认框
                this.$confirm('是否删除', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error'
                    }).then(() => {
                        //发送请求删除
                        this.$axios.get(this.$api.gsDel + ids).then(res => {
                            if (res.data.status == 0) {
                                //成功后的确认信息
                                this.$message({
                                    type: 'success',
                                    message: res.data.message
                                });
                                //删除成功后重新发送请求获取数据
                                this.getGoodsList();
                            }else{
                                this.$message({
                                    type: 'error',
                                    message: res.data.message
                                });
                            }
                        })
                    })      
            },

            //全选
            checkAll(){
                 document.querySelector('.el-checkbox__original').click();
            },

            //监听页面条数容量
            handleSizeChange(size){
                this.pageSize = size;
                this.getGoodsList();
            },

            //监听当前页码
            handleCurrentChange(pages){
                this.pageIndex = pages;
                this.getGoodsList();
            }
        },
        created(){
            this.getGoodsList();
        }
    }
</script>

<style scoped lang="less">
    .list{

        .el-breadcrumb{
            padding-bottom:10px;
            border-bottom: 1px solid #ccc;
        }

        .list_btns{
            margin-top:10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 10px;
            .list_search{
                width: 200px;
                float: right;
            }
        }

        a{
            font-size: 12px;
            color:rgb(34, 172, 236);
        }

        [class^=el-icon].active {
            color: red;
            font-weight: bold;
        }

        .el-pagination{
            margin-top:15px;
        }
    }
</style>