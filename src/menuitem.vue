/**
 * menuitem
 * tag:MenuItem
 * @param type {String}
 * @description
 * 列表下的子菜单链接
 * 默认情况请使用：
 * import MenuItem from 'menuitem.vue';
 */

<template lang="jade">
  li
    anchor(v-bind:href='href',v-bind:target='target',v-bind:click-handle='clickHandle')
      slot
</template>

<script>
  import Anchor from './anchor.vue';
  import LinkMixin from './mixin/linkMixin.js';
  export default{
    mixins:[LinkMixin],
    components:{
      Anchor
    }
  }
</script>
