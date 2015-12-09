<template lang='jade'>
div(v-bind:class='classes',role='tooltip')
  div.arrow(v-bind:style='arrowStyle')
  h3.popover-title(v-if='title!=""') {{title}}
  div.popover-content
    slot
</template>
<script>
/**
 * 弹出窗
 * tag:popover
 * @param title 标题
 * @param content
 * @placement
 */
import TipMixin from './mixin/poptipMixin.js';
export default {
  mixins:[TipMixin],
  props:{
    title:{
      type:String,
      default:''
    }
  },
  data(){
    return {
      tag:'popover',
      arrowStyle:{}
    }
  }
}
</script>
