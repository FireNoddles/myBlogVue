<template>
    <div>
        <el-button type="primary" icon="el-icon-edit" @click="jumpToEdit">编辑</el-button>
        <el-button type="primary" icon="el-icon-refresh-left" @click="jumpToList">返回</el-button>
        <div class = "title">{{article_name}}</div>
        <p v-html="article_content"></p>
    </div>
</template>

<script>
import { GetArticleInfoApi } from '@/request/api.js'
import Prism from 'prismjs'

export default({
    data() {
      return {
        article_content:"",
        article_name:"",
        searchParas:{
          id:0,
          name:"",
          category_id:"",
          page_size:10,
          page_num:1
        },
      }
      },
    created() {
        this.getArticle()
    },
    methods: {
      jumpToList(){
        this.$router.push('/admin/managerArticle')
      },
       jumpToEdit(){
         this.$router.push('/admin/editArticle?id='+ this.$route.query.id)
       },
        getArticle(){
            var search_data ={
                id : 0
            }
            
            search_data.id = parseInt(this.$route.query.id)
            GetArticleInfoApi(search_data).then(res=>{
                if (res.data.status === 0) {
                    this.article_content = res.data.data.content
                    this.article_name = res.data.data.name
                    this.$nextTick(() => {
                        Prism.highlightAll()
                    })
                }else{
                    alert(res.data.message)
                }
            })
        }
    }
})
</script>
<style>
.title{

    text-align: center;
    line-height: 100px;
    font-family:  "Hiragino Sans GB";
    font-size: 50px;
    color: rgb(95, 95, 95);
    font-style: normal;
    border-style: solid ;
    border-top-style:none;
    border-right-style: none;
    border-left-style: none;
    border-color: rgb(223, 172, 95);
    margin-bottom: 50px;
}
pre{
    background: #f5f2f0;
    padding: 1em;
    margin: .5em 0;
    overflow: auto;
}

blockquote{
  border-left: 8px solid #d0e5f2;
  padding: 10px 10px;
  margin: 10px 0;
  background-color: #f1f1f1;
}

table {
  border-collapse: collapse;
}
td,th {
  border: 1px solid #ccc;
  min-width: 50px;
  height: 20px;
}th {
  background-color: #f1f1f1;
}

ul,ol {
  padding-left: 20px;
}
p,li {
  white-space: pre-wrap; /* 保留空格 */
}


code{
    color: black;
    background: none;
    text-shadow: 0 1px white;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    font-size: 1em;
    text-align: left;
    white-space: pre;
    word-spacing: normal;
    word-break: normal;
    word-wrap: normal;
    line-height: 1.5;
    -moz-tab-size: 4;
    -o-tab-size: 4;
    tab-size: 4;
    -webkit-hyphens: none;
    -moz-hyphens: none;
    -ms-hyphens: none;
    hyphens: none;
    }
</style>
