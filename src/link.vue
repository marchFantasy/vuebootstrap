/**
 * link
 * tag:VLink
 * @param href
 * @param target
 * @description
 * 链接标签
 * 不能命名link，否则不会成功，默认情况请使用：
 * import VLink from 'link.vue';
 */
<template lang="jade">
  a(href='{{href}}',target='{{target}}',v-bind:click='clickHandle')
    slot
</template>
<script>
import LinkMixin from './mixin/linkMixin.js';
export default{
  mixins:[LinkMixin]
}
</script>
