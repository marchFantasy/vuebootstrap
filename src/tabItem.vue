/**
 * tabitem选项卡
 * tag:TabItem
 * @description
 * 这里data属性好像没有什么用，主要是父组件操作
 */

<template lang="jade">
div(v-bind:class='classes')
  slot
</template>
<script>
export default{
  props:{
    isIn:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return{
      classes:{'tab-pane':true,'fade':true,'in':false}
    }
  },
  created(){
    if(this.isIn){
      this.classes['in'] = true;
    }else{
      this.classes['in'] = false;
    }
  }
}
</script>
