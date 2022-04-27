<template>
<div>
<el-form :inline="true" :model="addArticleParas"  class="demo-form-inline" >
  <el-form-item label="标题">
    <el-input style="width: 850px;" v-model="addArticleParas.name" placeholder="文章标题"></el-input>
  </el-form-item>
    <el-form-item label="类别" >
      <el-select v-model="addArticleParas.category_id" placeholder="类别">
        <el-option v-for='(item, i) in category_list' :key="i" :label="item.name" :value="item.id"></el-option>
      </el-select>
  </el-form-item>
  <el-form-item label="简介">
    <el-input style="width: 1100px;" type="textarea" v-model="addArticleParas.name" placeholder="文章简介"></el-input>
  </el-form-item>
</el-form>
    <div style="border: 1px solid #ccc;">
        <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editor"
            :defaultConfig="toolbarConfig"
            :mode="mode"
        />
        <Editor
            style="height: 500px; overflow-y: hidden;"
            :defaultConfig="editorConfig"
            :mode="mode"
            @onCreated="onCreated"
        />
    </div>
    <div class="button">
        <el-button type="success" @click="addArticle">提交</el-button>
        <el-button type="warning" @click="cancleArticle">取消</el-button>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {GetCategoryListApi} from '@/request/api.js'
export default Vue.extend({
    components: { Editor, Toolbar },
    data() {
        return {
            category_list : [],
            addArticleParas:{
              name:"",
              category_id:"",
              desc:"",
              content:""
            },
            editor: null,
            toolbarConfig: { },
            editorConfig: { placeholder: '请输入内容...' },
            mode: 'default', // or 'simple'
        }
    },
    created() {
      this.getCategoryList()
    }, 
    methods: {
      addArticle(){
        
      },
      getCategoryList(){
        this.category_list.length=0
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
        onCreated(editor) {
            this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
        },
        onChanged(editor) {
            console.log(editor.getHtml()) // 一定要用 Object.seal() ，否则会报错
        },
    },

    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    }
})
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped>
 .button{
   text-align: center;
    margin-top: 15px;
}
</style>