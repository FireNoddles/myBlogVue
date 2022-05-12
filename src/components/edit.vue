<template>
<div>
<el-form :inline="true" :model="addArticleParas"  class="demo-form-inline" >
  <el-form-item label="标题">
    <el-input style="width: 850px;" v-model="addArticleParas.name" placeholder="文章标题" @blur="autoSave"></el-input>
  </el-form-item>
    <el-form-item label="类别" >
      <el-select v-model="addArticleParas.category_id" placeholder="类别">
        <el-option v-for='(item, i) in category_list' :key="i" :label="item.name" :value="item.id"></el-option>
      </el-select>
  </el-form-item>
  <el-form-item label="简介">
    <el-input style="width: 1100px;" type="textarea" v-model="addArticleParas.desc" placeholder="文章简介"></el-input>
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
        <el-button type="success" @click="shutDownEdit">提交</el-button>
        <el-button type="warning" @click="cancleArticle">取消</el-button>
    </div>
</div>
</template>

<script>
import Vue from 'vue'
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import {GetCategoryListApi, PostAddArticleApi, GetArticleInfoApi, PostUpdateArticleApi} from '@/request/api.js'
import 'prismjs/themes/prism-twilight.min.css'
export default Vue.extend({
    components: { Editor, Toolbar },
    data() {
        return {
            category_list : [],
            timeTag:0,
            isFisrtAuto:true,
            addArticleParas:{
              id:0,
              name:"",
              category_id:1,
              desc:"",
              content:""
            },
            editor: null,
            toolbarConfig: { },
            editorConfig: { placeholder: '请输入内容...',MENU_CONF:{} },
            mode: 'default', // or 'simple'
        }
    },
    created() {
      this.getCategoryList()
      this.initUpload()
      this.ifUpdate()
    }, 
    methods: {
      autoSave(){
        if (this.isFisrtAuto === false){
          return
        }
        this.isFisrtAuto = false
        this.timeTag = setInterval(()=>{
          if (this.addArticleParas.name === ""){
            return 
          }else{
          this.editArticle()
        } }, 60000);
        
        
      },
      cancleArticle(){
        this.$router.push('/admin/managerArticle')
      },
      ifUpdate(){
        if (this.$route.query.id != null){
          var search_data = {
            id:""
          }
          search_data.id = parseInt(this.$route.query.id)
            GetArticleInfoApi(search_data).then(res=>{
                if (res.data.status === 0) {
                    this.addArticleParas.name = res.data.data.name
                    this.addArticleParas.id = res.data.data.id
                    this.addArticleParas.category_id = res.data.data.cid
                    this.addArticleParas.desc = res.data.data.desc
                    this.editor.dangerouslyInsertHtml(res.data.data.content)

                }else{
                    alert(res.data.message)
                }
            })
        }
      },
      shutDownEdit(){
        clearInterval(this.timeTag)
        this.editArticle()
        this.$router.push('/admin/managerArticle')
      },

      editArticle(){
        if (this.addArticleParas.id != 0){
          this.addArticleParas.content = this.editor.getHtml()
          PostUpdateArticleApi(this.addArticleParas).then(res=>{
            if (res.data.status === 0) {
              this.$notify({
            title: '更新',
          message: '自动保存成功',
          type: 'success'
        });
              // alert("更新成功")
              // this.$route.push('admin/managerArticle')
            }else{
              alert(res.data.message)
          }
        })
        }else{
          this.addArticleParas.content = this.editor.getHtml()
        PostAddArticleApi(this.addArticleParas).then(res=>{
          if (res.data.status === 0) {
            this.addArticleParas.id = res.data.data.id
            this.$notify({
            title: '增加',
          message: '自动保存成功',
          type: 'success'
        });
            // this.$router.push('/admin/managerArticle')
          }else{
            alert(res.data.message)
          }
        })
        }
      },
      initUpload(){
        const token = window.sessionStorage.getItem('token')
        this.editorConfig.MENU_CONF['uploadImage'] = {
            server: 'http://localhost:8000/my-blog/admin/file/upload',
            headers: {
              Authorization: `Bearer ${token}`
            },
            fieldName: 'file',
            customInsert(res, insertFn) {
              var url = ""
              var alt = ""
              var href = ""
              console.log(res.data)
              if (res.status === 0) {
                url = res.data.url
              }else{
                alert(res.data.message)
                return
              }
        // 从 res 中找到 url alt href ，然后插图图片
              insertFn(url, alt, href)
            },
        }
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
        // onChanged(editor) {
        //     console.log(editor.getHtml()) // 一定要用 Object.seal() ，否则会报错
        // },
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