<template>
<div>
<editor ref="editorOne" v-model="detail"  @change="change"></editor>
</div>
</template>

<script>
import Editor from './edit.vue'

export default({
  components: { Editor},
data() {
      return {
        detail:""
        }
      },  
methods: {
  change(val) {
      console.log(val)
    },
 }
})
</script>
