<style lang='stylus'>
.popover-wrap
  display:inline-block
  position:relative
</style>
<template lang='jade'>
div.popover-wrap
  slot
popover(
  v-ref:popover,
  v-bind:title='title'
  v-bind:style='tipPosition',
  v-bind:placement='placement',
  v-bind:show='show',
  ) {{content}}
</template>
<script>
/**
 * popoverTrigger
 * tag:popoverTrigger
 * @param trigger 触发类型
 * @param placement 位置
 * @description
 */

import Popover from './popover.vue';
import TipTriggerMixin from './mixin/tipTriggerMixin.js';

export default{
  mixins:[TipTriggerMixin],
  props:{
    title:{
      type:String,
      default:''
    }
  },
  data(){
    return{
      tag:"popover"
    }
  },
  components:{
    Popover
  }

}
</script>
