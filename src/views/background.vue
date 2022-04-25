<template>
<div>
<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
  <el-radio-button :label="false">展开</el-radio-button>
  <el-radio-button :label="true">收起</el-radio-button>
</el-radio-group>
<el-container style="height: 500px; border: 1px solid #eee">
<el-menu default-active="1-4-1" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
  <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
    <i class="el-icon-setting"></i>
    <span slot="title">{{ item.navItem }}</span>
  </el-menu-item>
</el-menu>
<el-container>
  <el-main>
  <router-view/>
  </el-main>
</el-container>
</el-container>
</div>
</template>
<script>
  export default {
    data() { 
        return { 
          isCollapse: false,
            navList:[ 
            {name:'/admin/managerUsers',navItem:'用户管理'}, 
            {name:'/admin/managerCategory',navItem:'文章类别管理'},
            {name:'/admin/managerArticle',navItem:'文章管理'}, 
            {name:'/components/Personnel',navItem:'人员数据'}, 
            {name:'/components/alarm',navItem:'报警中心'}, 
            ] } 
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
    .menu-right{
        margin-left:200px;
        margin-top:100px;

    }
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
    
</style>