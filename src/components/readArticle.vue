<template>
    <div>
        <div class = "title">{{article_name}}</div>
        <p v-html="article_content"></p>
    </div>
</template>

<script>
import { GetArticleInfoApi } from '@/request/api.js'

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
        getArticle(){
            console.log(this.$route.query.id)
            var search_data ={
                id : 0
            }
            
            search_data.id = parseInt(this.$route.query.id)
            console.log(search_data.id)
            GetArticleInfoApi(search_data).then(res=>{
                if (res.data.status === 0) {
                    this.article_content = res.data.data.content
                    this.article_name = res.data.data.name
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
</style>
