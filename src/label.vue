<template lang="jade">
span.label(v-bind:class='classes')
  span(v-if='!hasHref')
    slot
  anchor(v-if='hasHref',
        v-bind:href='href',
        v-bind:target='target',
        v-bind:disabled='disabled')
    slot
</template>
<script>
/**
 * label
 * tag:label
 * @param bsStyle
 * @description
 * 可以添加跳转链接，自动转换a标签
 * 不能使用系统已存在的label标签调用，或者添加is属性，否则不会成功，默认情况请使用：
 * import Label from 'label.vue';
 */
  import Anchor from './anchor.vue';
  import LinkMixin from './mixin/linkMixin.js';
  import BsMixin from './mixin/bsMixin.js';
  export default{
    mixins:[LinkMixin,BsMixin],
    data(){
      return{
        tag:'label',
        classes:{}
      }
    },
    computed:{
      hasHref(){
        return !!this.href && this.href !== "javascript:;";
      }
    },
    components:{
      Anchor
    }
  }
</script>
