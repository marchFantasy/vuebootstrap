/**
 * button
 * tag:Button
 * @param type  button,submit
 * @param bsStyle primary,success,info....
 * @param size lg,xs,sm
 * @description
 * 按钮标签
 * 之所以命名为bsStyle，是因为style已被系统变量占用
 * 可以直接命名为Button,默认情况请使用：
 * import Button from 'button.vue';
 */
<template lang="jade">
button(class='{{classes}}',type='{{type}}')
  slot
</template>

<script>

import ButtonMixin from './mixin/ButtonMixin.js';
export default{
  mixins:[ButtonMixin],
  props:{
    'type':{
      type:String,
      default:"button"
    },
  },
  computed:{
    bSize(){
      return this.size || null;
    }
  },
  created(){
    this.classes += " btn-"+this.bsStyle;
    if(this.bSize){
      this.classes += " btn-"+this.size;
    }
  },
  data(){
    return {
      classes:"btn"
    }
  }
}
</script>
