<template lang='jade'>
div.thumbnail
  anchor(v-bind:href='href',v-bind:target='target')
    img(v-bind:src='src',v-bind:alt='alt')
  div.caption
    slot
</template>
<script>
/**
 * 缩略图
 */
import LinkMixin from './mixin/linkMixin.js';
import Anchor from './anchor.vue';

export default{
  mixins:[LinkMixin],
  props:{
    src:{
      type:String,
      required:true
    },
    alt:{
      type:String,
      default:''
    }
  },
  components:{
    Anchor
  }
}
</script>
