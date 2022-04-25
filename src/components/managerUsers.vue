<template>
<div>
<el-form :inline="true" :model="searchParas" class="demo-form-inline">
  <el-form-item label="序号">
    <el-input v-model="searchParas.id" placeholder="Id"></el-input>
  </el-form-item>
  <el-form-item label="用户名">
    <el-input v-model="searchParas.username" placeholder="用户名"></el-input>
  </el-form-item>
  <el-form-item label="角色">
    <el-select v-model="searchParas.role" clearable placeholder="角色">
      <el-option label="管理员" value=1></el-option>
      <el-option label="用户" value=2></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="getUserList">查询</el-button>
  </el-form-item>
  <el-button type="primary"  @click="dialogFormVisible = true">新增</el-button>
  <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
  <el-form :model="addUserParas">
    <el-form-item label="用户名" :label-width="formLabelWidth">
      <el-input v-model="addUserParas.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" :label-width="formLabelWidth">
      <el-input type="password" v-model="addUserParas.pwd" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色" :label-width="formLabelWidth">
      <el-select v-model="addUserParas.role" placeholder="请选择角色">
        <el-option label="管理员" value=1></el-option>
      <el-option label="用户" value=2></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
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
        <el-button @click="updateUserPre(scope.row)" type="text" size="small" icon="el-icon-edit"></el-button>
        </el-tooltip>
        <el-tooltip content="删除" placement="top">
        <el-button @click="deleteUser(scope.row)" type="text" size="small" icon="el-icon-delete"></el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog title="编辑用户" :visible.sync="dialogUpdateFormVisible">
            <el-form :model="updateUserParas">
              <el-form-item label="ID" :label-width="formLabelWidth">
                <el-input :disabled="true" type="text" v-model="updateUserParas.id" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="updateUserParas.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="角色" :label-width="formLabelWidth">
                <el-select v-model="updateUserParas.role" placeholder="请选择角色">
                  <el-option label="管理员" value=1></el-option>
                <el-option label="用户" value=2></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogUpdateFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="updateUser">确 定</el-button>
            </div>
          </el-dialog>
</div>
</template>

<script>
import {GetUserListApi, PostAddUserApi, PostUpdateUserApi, PostDelUserApi} from '@/request/api.js'
  export default {
    data() {
      return {
        dialogUpdateFormVisible:false,
        dialogFormVisible: false,
        formLabelWidth: '120px',
        searchParas : {
          username:"",
          role:"",
          id :"",
        },

        addUserParas : {
          username:"",
          role:"",
          pwd:""
        },
        updateUserParas: {
          username:"",
          role:"",
          id:0
        },

        tableName : {
          id :"序号",
          username:"用户名",
          role:"角色",
          
        },
        roleTrans :{
          1:"管理员",
          2:"用户"
        },
        tableData: [],
      }
    },

    created() {
      this.getUserList()
    },

    methods: {
      getUserList(){
        this.tableData = []
        if (this.searchParas.id != ""){
          this.searchParas.id = parseInt(this.searchParas.id)
        }
        
        GetUserListApi(this.searchParas).then(res=>{
          if (res.data.status === 0) {
            for (const key in res.data.data.list){
              var data = res.data.data.list[key]
              data["role"] = this.roleTrans[data["role"]]
              this.tableData.push(data)
            }
          }else{
            alert(res.data.message)
          }
        })
      },
      addUser(){
        if (this.addUserParas.role === ""){
          return
        }else{
          this.addUserParas.role = parseInt(this.addUserParas.role)
        }
        PostAddUserApi(this.addUserParas).then(res=>{
          if (res.data.status === 0) {
            this.$message('创建成功！');
            this.dialogUpdateFormVisible = false
          }else{
            let message = res.data.message + "创建失败!"
            this.$message(message);
          }
        })
      },
      updateUser(){
        if (this.updateUserParas.role === 0 || this.updateUserParas.username === ""){
          return
        }
        this.updateUserParas.role = parseInt(this.updateUserParas.role)
        PostUpdateUserApi(this.updateUserParas).then(res=>{
          if (res.data.status === 0) {
            this.$message('修改成功！');
            this.dialogUpdateFormVisible = false

          }else{
            let message = res.data.message + "修改失败!"
            this.$message(message);
          }
        })
      },
      updateUserPre(data){
        this.updateUserParas.username = data.username
        if (data.role === "管理员"){
            this.updateUserParas.role = "1"
        }else{
          this.updateUserParas.role = "2"
        }
        this.updateUserParas.id = data.id
        this.dialogUpdateFormVisible = true
      },
      deleteUser(data) {
        var paras = {
          id:data.id
        }
        this.$confirm('确认删除该用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          PostDelUserApi(paras).then(res =>{
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