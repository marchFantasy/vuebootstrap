/**
 * label
 * tag:VLabel
 * @type {String}
 * @description
 * 可以添加跳转链接，自动转换a标签
 * 不能使用系统已存在的label标签调用，否则不会成功，默认情况请使用：
 * import VLabel from 'label.vue';
 */
<template lang="jade">
span.label(class='label-{{type}}')
  span(v-if='href === null')
    slot
  v-link(v-if='href != null',v-bind:href='href',v-bind:target='target')
    slot
</template>
<script>
  import VLink from './link.vue';
  export default{
    props:{
      'type':{
        type:String,
        default:"default"
      },
      'href':{
        type:String,
        default:null
      },
      'target':{
        type:String
      }
    },
    components:{
      VLink
    }
  }
</script>
