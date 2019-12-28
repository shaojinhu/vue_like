<template>
    <div style="padding-top:100px;">
        <el-card class="box-card" style="height:500px;width:1500px;margin:0 auto;">
        
        <el-row style="height:40px;line-height:40px;margin-bottom:5px;">
            <el-col :span="7">
                    <el-button
                    size="small"
                    type="success"
                    icon="el-icon-circle-plus-outline"
                    @click="handleAdd">添加</el-button>
            </el-col>
        </el-row>
        
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="manName"
                label="联系人名称"
                width="120">
            </el-table-column>
            <el-table-column
                prop="manStationName"
                label="所在区域"
                width="120">
            </el-table-column>
            <el-table-column
                prop="manAddress"
                label="详细地址"
                width="120">
            </el-table-column>
            <el-table-column
                prop="manTel"
                label="联系人电话"
                width="120">
            </el-table-column>
            <el-table-column
                prop="manTypeName"
                label="联系人类型"
                width="120">
            </el-table-column>
            <el-table-column
                prop="companyName"
                label="公司名称"
                width="120"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="operateName"
                label="操作人"
                width="120"
                show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                prop="operateDateTime"
                label="操作时间"
                width="120"
                show-overflow-tooltip>
            </el-table-column>
            <!-- 操作 -->
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    icon="el-icon-check"
                    @click="handleUpdate(scope.row)">修改</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-close"
                    @click="handleDelete(scope.row.serialID)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            layout="prev, pager, next"
            :total="param.total"
            @current-change="currentChange">
        </el-pagination>
        </el-card>

        <Add ref="Add"></Add>
        <Update ref="Update"></Update>
    </div>
</template>
<script>
import { getLikemanList,deleteLike} from "@/api/public/likeman.js"
export default {
    name:"home",
    data(){
        return{
            tableData:[],
            param:{page:1,size:10,total:0}
        }
    },
    methods:{
        //添加
        handleAdd(data){
            this.$refs.Add.form = {};
            this.$refs.Add.dialogFormVisible = true;
        },
        //修改
        handleUpdate(data){
            this.$refs.Update.form = data;
            this.$refs.Update.dialogFormVisible = true;
        },
        handleDelete(data){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
               deleteLike(data).then(res=>{
                if(res.data.code == 10000){
                    this.$message({message:res.data.message,type:"success"})
                    this.getList();
                }else{
                    this.$message({message:res.data.message,type:"error"})
                }
            })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //页容量发生变化时
        sizeChange(pageSize){
            this.param.size = pageSize;
            this.getList();
        },
        //页码发生改变时
        currentChange(page){
            this.param.page = page;
            this.getList();
        },
        //获得任务列表
        getList(){
            getLikemanList(this.param).then(res=>{
                if(res.data != null){
                    console.log(res.data.data.rows);
                    this.tableData = res.data.data.rows;
                    this.param.total = res.data.data.total;
                }
            });
        }
    },
    created(){
        this.getList();
    },
    components:{
        Add:()=>import("@/views/public/Add.vue"),
        Update:()=>import("@/views/public/Update.vue")
    }
}
</script>
<style scoped>
    .box-card{
        height:200px;
    }
</style>