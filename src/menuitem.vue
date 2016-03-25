<template lang="jade">
  li(v-bind:class="{'disabled':disabled,'dropdown-header':header,'divider':divider}")
    anchor(v-if="!header && !divider",
          v-bind:href='href',
          v-bind:target='target',
          v-bind:on-click='onClick',
          v-bind:disabled='disabled')
      slot
    slot(v-if="header && !divider")
</template>

<script>
/**
 * menuitem
 * tag:MenuItem
 * @param type {String}
 * @description
 * 列表下的子菜单链接
 * 默认情况请使用：
 * import MenuItem from 'menuitem.vue';
 */
  import Anchor from './anchor.vue';
  import LinkMixin from './mixin/linkMixin.js';
  export default{
    mixins:[LinkMixin],
    props:{
      header:{
        type:Boolean,
        default:false
      },
      divider:{
        type:Boolean,
        default:false
      },
      onClick:{
        type:Function,
        default:()=>{}
      }
    },
    components:{
      Anchor
    }
  }
</script>
