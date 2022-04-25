<template>
<div>
<el-form :inline="true" :model="searchParas" class="demo-form-inline">
  <el-form-item label="序号">
    <el-input v-model="searchParas.id" placeholder="Id"></el-input>
  </el-form-item>
  <el-form-item label="类别名">
    <el-input v-model="searchParas.name" placeholder="类别名"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="getCategoryList">查询</el-button>
  </el-form-item>
  <el-button type="primary"  @click="dialogFormVisible = true">新增</el-button>
  <el-dialog title="新增类别" :visible.sync="dialogFormVisible">
  <el-form :model="addCategoryParas">
    <el-form-item label="类别名" :label-width="formLabelWidth">
      <el-input v-model="addCategoryParas.name" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCategory">确 定</el-button>
  </div>
</el-dialog>
</el-form>

<el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column v-for='(item,i) in tableName' :key="i" :label="item" :prop="i"  width="180">
    </el-table-column>
     <el-table-column
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-tooltip content="编辑" placement="top">
        <el-button @click="updateCategoryPre(scope.row)" type="text" size="small" icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip content="删除" placement="top">
        <el-button @click="deleteCategory(scope.row)" type="text" size="small" icon="el-icon-delete"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="编辑类别信息" :visible.sync="dialogUpdateFormVisible">
            <el-form :model="updateCategoryParas">
              <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input :disabled="true" type="text" v-model="updateCategoryParas.id" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="类别名" :label-width="formLabelWidth">
                <el-input v-model="updateCategoryParas.name" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogUpdateFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateCategory">确 定</el-button>
            </div>
          </el-dialog>
</div>
</template>

<script>
import {GetCategoryListApi, PostAddCategoryApi, PostUpdateCategoryApi, PostDelCategoryApi} from '@/request/api.js'
  export default {
    data() {
      return {
        dialogUpdateFormVisible:false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        searchParas : {
          name:"",
          id :"",
        },

        addCategoryParas : {
          name:"",
        },
        updateCategoryParas: {
          name:"",
          id:0
        },

        tableName : {
          id :"序号",
          name:"类别名",
        },
        tableData: [],
      }
    },

    created() {
      this.getCategoryList()
    },

    methods: {
      getCategoryList(){
        this.tableData = []
        if (this.searchParas.id != ""){
          this.searchParas.id = parseInt(this.searchParas.id)
        }
        
        GetCategoryListApi(this.searchParas).then(res=>{
          if (res.data.status === 0) {
            for (const key in res.data.data.list){
              var data = res.data.data.list[key]
              this.tableData.push(data)
            }
          }else{
            alert(res.data.message)
          }
        })
      },
      addCategory(){
        if (this.addCategoryParas.name === ""){
          return
        }
        PostAddCategoryApi(this.addCategoryParas).then(res=>{
          if (res.data.status === 0) {
            this.$message('创建成功！');
            this.dialogFormVisible = false
          }else{
            let message = res.data.message + "创建失败!"
            this.$message(message);
          }
        })
      },
      updateCategory(){
        if (this.updateCategoryParas.name === ""){
          return
        }
        PostUpdateCategoryApi(this.updateCategoryParas).then(res=>{
          if (res.data.status === 0) {
            this.$message('修改成功！');
            this.dialogUpdateFormVisible = false

          }else{
            let message = res.data.message + "修改失败!"
            this.$message(message);
          }
        })
      },
      updateCategoryPre(data){
        this.updateCategoryParas.name = data.name
        this.updateCategoryParas.id = data.id
        this.dialogUpdateFormVisible = true
      },
      deleteCategory(data) {
        var paras = {
          id:data.id
        }
        this.$confirm('确认删除该类别?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          PostDelCategoryApi(paras).then(res =>{
            if (res.data.status === 0){
              this.$message({
                type: 'success',
                message: '删除成功!'
                
              })
            }else{
              let message = res.data.message + "删除失败!"
              this.$message(message);
            }
          } 
          );
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }
</script>