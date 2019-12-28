<template>
    <div class="login">
        <div class="login-con">
            <el-card shadow="hover">
                <template slot="header">
                    <span style="font-weight:bold;">
                        <i class="el-icon-thumb"></i>
                        欢迎登录
                    </span>
                </template>
                <div style="height:100%;width:100%;">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
                        <el-form-item style="margin-bottom:15px;" label="用户名" prop="username">
                            <el-input size="small" placeholder="请输入用户名" type="text" v-model="ruleForm.username">
                            </el-input>
                        </el-form-item>
                        <el-form-item style="margin-bottom:18px;" label="密码" prop="password">
                            <el-input size="small" placeholder="请输入密码" type="password" v-model="ruleForm.password" autocomplete="off">
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-row>
                        <el-col :span="24">
                            <el-button size="small" style="width:100%;margin:0 auto;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        </el-col>
                        <el-col :span="24">
                            <el-button size="small" style="width:100%;margin-top:10px;" @click="resetForm('ruleForm')">重置</el-button>
                        </el-col>
                    </el-row>
                </div>
                
            </el-card>
        </div>

    </div>
</template>

<script>
import {login} from "@/api/public/login.js"
export default {
    name:"login",
    data(){
        //自定义校验
        var valiUserName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('用户名称不能为空'));
            }else{
                callback();
            }
        };
        var valiPass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {  //表单的用户名、密码字段
                username: 'zhangsan',
                password: '123456',
            },
            rules: {
                username: [
                    { validator: valiUserName, trigger: 'blur' }
                ],
                password: [
                    { validator: valiPass, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        //提交操作
        submitForm(formName) {
            let that = this;
            that.$refs[formName].validate((valid) => {
                if (valid) {
                    login(this.ruleForm).then(res=>{
                        if(res.data.code == 10000){
                            localStorage.setItem("token",res.data.data);
                            that.$router.push({name:"home"}); 
                        }else{
                            this.$message({message:"登陆失败",type:"error"});
                        }
                    })
                }
            });
        },
        //重置表单
        resetForm(formName) {
            // this.$refs[formName].resetFields();
            this.ruleForm = {};
        }
    }
}
</script>

<style scoped>
    .login{
        width: 100%;
        height: 100vh;
        background-image: url('../../assets/images/login-bg.jpg');
        background-size: cover;
        background-position: center;
        position: relative;
    }
    .login-con{
        position: absolute;
        right: 180px;
        top: 40%;
        transform: translateY(-60%);
        width: 330px;
    }
    .login .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
    }
    .login .form-con{
        padding: 10px 0 0;
    }
</style>
<style>
    .el-card__body{
        padding: 15px;
    }
</style>