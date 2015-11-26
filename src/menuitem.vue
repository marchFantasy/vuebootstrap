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
    v-link(v-bind:href='href',v-bind:target='target',v-bind:click-handle='clickHandle')
      slot
</template>

<script>
  import VLink from './link.vue';
  import LinkMixin from './mixin/linkMixin.js';
  export default{
    mixins:[LinkMixin],
    components:{
      VLink
    }
  }
</script>
