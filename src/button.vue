<template lang="jade">
button(v-bind:class='classes',v-bind:type='type')
  slot
</template>

<script>
/**
 * button
 * tag:btn
 * @param type  button,submit
 * @param bsStyle primary,success,info....
 * @param bsSize lg,xs,sm
 * @description
 * 按钮标签
 * 之所以命名为bsStyle，是因为style已被系统变量占用
 * 可以直接命名为Button,默认情况请使用：
 * import Button from 'button.vue';
 */
import BsMixin from './mixin/bsMixin.js';
export default{
  mixins:[BsMixin],
  props:{
    'type':{
      type:String,
      default:"button"
    },
    'onClick':{
      type:Function,
      default:null
    }
  },
  data(){
    return {
      tag:'btn',
      classes:{}
    }
  }

}
</script>
