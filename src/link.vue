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
  a(href='{{href}}',target='{{target}}')
    slot
</template>
<script>
export default{
  props:{
    'href':{
      type:String,
      default:null
    },
    'target':{
      type:String
    }
  }
}
</script>
