<template>
<div>
<el-form :inline="true" :model="searchParas" class="demo-form-inline">
  <el-form-item label="序号">
    <el-input v-model="searchParas.id" placeholder="文章序号"></el-input>
  </el-form-item>
  <el-form-item label="标题">
    <el-input v-model="searchParas.name" placeholder="文章标题"></el-input>
  </el-form-item>
    <el-form-item label="类别" >
      <el-select v-model="searchParas.category_id" placeholder="类别">
        <el-option v-for='(item, i) in category_list' :key="i" :label="item.name" :value="item.id"></el-option>
      </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="getArticleList">查询</el-button>
  </el-form-item>
  
  <el-button type="primary"  @click="toEdit">去写文章</el-button>
</el-form>

<el-row>
  <el-col :span="20" v-for="(o, index) in this.card_data.list" :key="index" :offset="0" >
    <el-card :body-style="{ padding: '20px' }" class ="card">
        <el-avatar class = "image" shape="square" :style="`background:${extractColorByName(o.name)}`"> {{o.id}} </el-avatar>
      <div>
        <router-link :to="{path:'/admin/readArticle',query: {id: o.id}}" >
          <span class="text">{{o.name}}</span>
        
        <div class="bottom clearfix">
          <time class="time">{{ o.desc }}</time>
          
        </div>
        </router-link>
        <el-button type="primary" plain size="small" class="comment">评论:{{o.comment_count}}</el-button>
          <el-button type="primary" plain size="small" class="read">阅读:{{o.read_count}}</el-button>
      </div>
    </el-card>
  </el-col>
</el-row>
<el-row>
  <el-col :span=24><div class = "pagepos">
    <el-pagination
  background
  layout="prev, pager, next"
  :page-size="searchParas.page_size"
  :current-page="page_num"
  :hide-on-single-page="true"
  :total="card_data.total"
  @current-change="pageChange"
  >
</el-pagination>
    </div></el-col>
</el-row>
</div>


</template>

<script>
import Editor from './edit.vue'
import {GetCategoryListApi, GetArticleListApi} from '@/request/api.js'

export default({
  components: { Editor},
data() {
      return {
        page_num:1,
        currentDate: new Date(),
        detail:"",
        searchParas:{
          id:"",
          name:"",
          category_id:"",
          page_size:10,
          page_num:1
        },
        category_list : [],
        card_data :{
          total: 0,
          list: []
        }
        }
      },
created() {
      this.getCategoryList()
      this.getArticleList()
    },  
methods: {
  toEdit(){
    console.log(this.$parent.isShow)
      this.$parent.isShow = false
      this.$router.push('/admin/editArticle')
  },
  extractColorByName(name) {
	      var temp = [];
	      temp.push("#");
	      for (let index = 0; index < name.length; index++) {
	        temp.push(parseInt(name[index].charCodeAt(0), 10).toString(16));
	      }
	      return temp.slice(0, 5).join('').slice(0, 4);
	    },
  getCategoryList(){
        this.category_list.length=0
        if (this.searchParas.id != ""){
          this.searchParas.id = parseInt(this.searchParas.id)
        }
        var data = {
          id:"",
          name:""
        }
        
        GetCategoryListApi(data).then(res=>{
          if (res.data.status === 0) {
            for (const key in res.data.data.list){
              let data = res.data.data.list[key]
              this.category_list.push(data)
            }
          }else{
            alert(res.data.message)
          }
        })
      },
      pageChange(val){
      this.searchParas.page_num = val
      this.getArticleList()
      
    },
  getArticleList(){
        this.card_data.list=[]
        this.card_data.total = 0
        if (this.searchParas.id != ""){
          this.searchParas.id = parseInt(this.searchParas.id)
        }
        if (this.searchParas.category_id != ""){
          this.searchParas.category_id = parseInt(this.searchParas.category_id)
        }
        
        GetArticleListApi(this.searchParas).then(res=>{
          if (res.data.status === 0) {
            this.card_data.total = res.data.data.total
            for (const key in res.data.data.list){
              let data = res.data.data.list[key]
              this.card_data.list.push(data)
            }
            this.page_num = this.searchParas.page_num
          }else{
            alert(res.data.message)
          }
        })
      },
  change(val) {
      console.log(val)
    },
 }
})
</script>

<style>
  .time {
    padding: 0px;
    margin-left: 100px;
    margin-top: -45px;
    font-size: 13px;
    color: #999;
  }
  .pagepos{
    margin-top: 30px;
    display: flex;    
    justify-content: center; 

  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .card {
    margin-top: 13px;
  }

  .read {
    margin-top: -20px;
    float: right;
  }

  .comment {
    margin-top: -65px;
    float: right;
  }

  .image {
    margin-left: 13px;
    margin-top: 10px;
    display: block;
  }
  .text {
    text-decoration:none;
    padding: 0px;
    margin-left: 100px;
    margin-top: -45px;
    display: block;
    font-size:20px;
    color: black;
    
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .router-link-active {
  text-decoration: none;
  color: yellow;
}
a{
  text-decoration: none;
  color: white;
}
</style>