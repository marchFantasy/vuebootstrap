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
    v-link(v-bind:href='href',v-bind:target='target')
      slot
</template>

<script>
  import VLink from './link.vue';

  export default{
    props:{
      href:{
        type:String
      },
      target:{
        type:String,
        default:null
      }
    },
    components:{
      VLink
    }
  }
</script>
