<template lang='jade'>
li(v-bind:class='classes')
  a(v-if='href != null',v-bind:href='href')
    slot
  slot(v-if='href === null')
</template>
<script>
/**
 * 面包屑项－子项
 * @param href 链接地址
 * @param active 激活状态
 */
export default{
  props:{
    active:{
      type:Boolean,
      default:false
    },
    href:{
      type:String,
      default:null
    }
  },
  data(){
    return {
      classes:{}
    };
  },
  created(){
    if(this.active){
      this.classes['active'] = this.active;
    }
  }
}
</script>
