/**
 * anchor
 * tag:Anchor
 * @param href
 * @param target
 * @description
 * 链接标签
 * 不能命名link，或者添加is属性，否则不会成功，默认情况请使用：
 * import Anchor from 'anchor.vue';
 */
<template lang="jade">
  a(href='{{href}}',target='{{target}}',@click='clickHandle')
    slot
</template>
<script>
import LinkMixin from './mixin/linkMixin.js';
export default{
  mixins:[LinkMixin],
  props:{
    onClick:{
      type:Function,
      default:null
    }
  },
  methods:{
    clickHandle(e){
      if(!this.href){
        e.preventDefault();
      }
      if(this.onClick){
        this.onClick(e);
      }

    }
  }
}
</script>
