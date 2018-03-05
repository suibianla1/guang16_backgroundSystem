<template>
    <div>
        <!-- 导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
            <el-breadcrumb-item>编辑商品</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="内容标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="副标题">
                <el-input v-model="form.sub_title"></el-input>
            </el-form-item>
            
            <el-form-item label="所属类别">
                <el-select v-model="form.category_id" placeholder="请选择">
                    <el-option v-for="item in category" :key="item.title" :label="item.title" :value="item.category_id">
                        <span v-if="item.class_layer != 1">|-</span> 
                        <span>{{ item.title }}</span>
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否发布">
                <el-switch v-model="form.status"></el-switch>
            </el-form-item>
            <el-form-item label="推荐类型">
                <el-switch v-model="form.is_slide" active-text="轮播图"></el-switch>
                <el-switch v-model="form.is_top" active-text="置顶"></el-switch>
                <el-switch v-model="form.is_hot" active-text="推荐"></el-switch>
            </el-form-item>

            <el-form-item label="上传图片">
                <el-upload
                class="upload-demo"
                action="http://localhost:8899/admin/article/uploadimg"
                :file-list="form.imgList"
                list-type="picture"
                :on-success="uploadImg">
                <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>

            <el-form-item label="上传附件">
                <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadfile"
                    :file-list="form.fileList" :on-success="uploadFile">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
            
           <el-form-item>
                <quillEditor v-model="form.content"></quillEditor>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button>取消</el-button>
            </el-form-item>

            
            
        </el-form>
    </div>
</template>

<script>
    //富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

    export default {
        data(){
            return{
                form: {},
                category:[],
                //获取url上面的参数id
                id: this.$route.params.id
            }
        },

        components: {
            //富文本编辑插件
            //quillEditor：quillEditor
            //es6语法
            quillEditor  
        },
        methods:{

            //根据id向后台发送请求
            getGoods() {
                this.$axios.get(this.$api.gsDetail + this.id).then(res => {    
                    if(res.data.status == 0) {
                        this.form = res.data.message;
                        //因为接的bug，yo'a'jia
                        this.form.category_id = +this.form.category_id;
                    }
                });
            },

            //请求分类
            getCate(){
                this.$axios.get(this.$api.ctList+"goods").then(res=>{
                    if (res.data.status == 0) {
                        this.category = res.data.message;
                    }
                })
            },

            //图片上传
            uploadImg(res){
                //将新上传的图片放进后台img数组中储存以便下次利用
                this.form.imgList=[res];
                // this.form.imgList.push(res);
                // console.log(this.form.imgList)
            },

            //附件上传
            uploadFile(res){
                this.form.fileList.push(res);
            },

            //保存
            onSubmit(){
                this.$axios.post(this.$api.gsEdit+this.id, this.form).then(res=>{
                    if (res.data.status==0) {
                        this.$alert(res.data.message,'',{
                            confirmButtonText: '确定',
                            callback: action => {
                                //成功后跳转回列表页面
                                this.$router.push({name:'goodsList'})
                            }
                        })
                    }else{
                        this.$alert(res.data.message)
                    }
                })
            }
        },
        
        created () {
            this.getGoods()
            this.getCate()
        }
    }
</script>

<style scoped lang="less">
    .el-breadcrumb{
        margin-bottom: 15px;
    }
    .el-input,.el-form-item__content .upload-demo, {
        width: 500px;
    }
    .el-form-item__content .quill-editor{
        width: 1000px;
    }
</style>