
<template lang="jade">
  a(href='{{href}}',
  target='{{target}}',
  @click='clickHandle',
  v-bind:class="{'disabled':disabled}")
    slot
</template>
<script>
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
import LinkMixin from './mixin/linkMixin.js';
export default{
  mixins:[LinkMixin],
  props:{
    onClick:{
      type:Function,
      default:()=>{}
    }
  },
  methods:{
    clickHandle(e){
      if(!this.href || this.href === 'javascript:;' || this.disabled){
        e.preventDefault();
      }
      if(this.onClick && !this.disabled){
        this.onClick(e);
      }

    }
  }
}
</script>
