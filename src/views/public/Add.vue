<template>
    <div>
        <el-dialog title="添加联系人" :visible.sync="dialogFormVisible" @close="()=>{this.isok = true;
        this.isoktwo = false}" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
            <el-form ref="form" :model="form" :rules="rules" label-width="100px" >

                <el-form-item label="联系人名称" prop="manName">
                    <el-input v-model="form.manName" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item label="详细地址" prop="manAddress">
                    <el-input v-model="form.manAddress" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item label="联系电话" prop="manTel">
                    <el-input v-model="form.manTel" style="width:90%;"></el-input>
                </el-form-item>

                <el-form-item label="所在区域" prop="manStation">
                    <el-select v-model="form.manStation" placeholder="请选择区域" style="width:90%;">
                        <el-option
                            v-for="item in AreaLsit"
                            :key="item.manStation"
                            :label="item.manStationName"
                            :value="item.manStation">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="联系人类型" prop="manType">
                    <el-select v-model="form.manType" placeholder="请选择类型" style="width:90%;">
                        <el-option
                            v-for="item in typeList"
                            :key="item.manType"
                            :label="item.manTypeName"
                            :value="item.manType">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="联系人公司" prop="companyOid">
                    <el-select v-model="form.companyOid" placeholder="请选择公司" style="width:90%;">
                        <el-option
                            v-for="item in companyList"
                            :key="item.companyOid"
                            :label="item.companyName"
                            :value="item.companyOid">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;">取消</el-button>
                <el-button type="primary" @click="handleSubmit" >提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { addLike,getTypeList,getStationList,getCompanyList } from "@/api/public/likeman.js"
export default {
    name:"add",
    data(){
        return{
            form:{},
            dialogFormVisible:false,
            typeList:[],
            companyList:[],
            AreaLsit:[],
            isok:true,
            isoktwo:false
        }
    },
    methods:{
        //提交表单
        handleSubmit(){
            this.$refs.form.validate(vali=>{
                if(vali){
                    addLike(this.form).then(res=>{
                        if(res.data.code = 200){
                            this.$message({message:"添加成功",type:"success"})
                            this.dialogFormVisible = false;
                            this.$parent.getList();
                        }else{
                            this.$message({message:"添加失败",type:"error"})
                        }
                    })
                }
            })
        },
    },
    computed:{
        rules:function(){
            return{
                manName:[{ required: true, message: '不允许为空', trigger: 'blur'}],
                manAddress:[{ required: true, message: '不允许为空', trigger: 'blur'}],
                manTel:[{ required: true, message: '不允许为空', trigger: 'blur'}],
                manStation:[{ required: true, message: '不允许为空', trigger: 'change'}],
                manType:[{ required: true, message: '不允许为空', trigger: 'change'}],
                companyOid:[{ required: true, message: '不允许为空', trigger: 'change'}],
            }
        }
    },
    created(){
        getTypeList().then(res=>{console.log(res);this.typeList = res.data.data});
        getStationList().then(res=>{this.AreaLsit = res.data.data});
        getCompanyList().then(res=>{this.companyList = res.data.data});
    },
    watch:{
        dialogFormVisible:function(val){
            if(!val){
                this.$refs.form.clearValidate();
            }
        }
    }
}
</script>
<style scoped>


</style>