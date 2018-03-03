<template>
<div>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/admin/orderlist' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="manager">
        <el-button size="mini" @click="selectAll">
            <i class="el-icon-check"></i>
            全选
        </el-button>
        <el-button size="mini">
            <i class="el-icon-delete"></i>
            删除
        </el-button>
        <el-select v-model="value" placeholder="请选择订单状态" size="small" text-color="blue"> 
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
        <el-input
        placeholder="请输入内容"
        v-model="input21"
        suffix-icon="el-icon-search"
        size="mini">
        </el-input>
    </div>

    <el-table
    :data="tableData3"
    height="400"
    border
    :highlight-current-row="isLight"
    style="width: 100%">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        prop="order_no"
        label="订单号"
        width="150">
        </el-table-column>
        <el-table-column
        prop="user_name"
        label="会员号"
        width="135">
        </el-table-column>
        <el-table-column
        prop="paymentTitle"
        label="支付方式"
        width="133">
        </el-table-column>
        <el-table-column
        prop="expressTitle"
        label="配送方式"
        width="133">
        </el-table-column>
        <el-table-column
        prop="statusName"
        label="订单状态"
        width="133">
        </el-table-column>
        <el-table-column
        prop="order_amount"
        label="总金额"
        width="133">
        </el-table-column>
        <el-table-column
        prop="add_time"
        label="下单时间"
        width="180">
        </el-table-column>
        <el-table-column
        prop="operation"
        label="操作"
        width="70">
            <template slot-scope="scope">
                <el-button
                type="text"
                size="small"
                >
                    修改
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <div class="pages">
        <el-pagination
        :page-sizes="[4, 6, 8, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalcount">
        </el-pagination>
    </div>
    
</div>
</template>

<script>
    export default {
        data() {
            return {
                isLight:true,
                tableData3: [],
                pageSize:10,
                pageIndex:1,
                totalcount:0,
                options: [{
                        value: '选项1',
                        label: '待付款'
                    }, 
                    {
                        value: '选项2',
                        label: '已付款待发货'
                    }, 
                    {
                        value: '选项3',
                        label: '已发货待签收'
                    }, 
                    {
                        value: '选项4',
                        label: '已签收'
                    }
                ],
                value: '',
                input21:''
            }
        },
        methods: {
            eidt(index, rows) {
                
            },
            selectAll(){

            }
        },
        created () {
            var pageSize = 10;
            var pageIndex =1;
            this.$axios.get(this.$api.odList+"?pageIndex="+ this.pageIndex +"&pageSize="+this.pageSize).then(res=>{
                this.tableData3 = res.data.message;
                this.totalcount = res.data.totalcount;
            })
        }
    }
</script>

<style scoped lang="less">
.el-breadcrumb{
    padding-bottom: 15px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 15px;
}
.el-pagination{
    margin-top: 15px;
}
.manager{
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    .el-input{
        width: 200px;
        float: right;
    }
}
</style>