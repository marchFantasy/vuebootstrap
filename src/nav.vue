<template lang='jade'>
ul.nav(v-bind:class='classes')
  slot
</template>
<script>
/**
 * nav
 * tag:nav
 * @description
 * 调用的时候切勿直接使用nav标签，会自动调用系统标签，需添加is属性
 * import Nav from './nac.vue';
 * nav(is='nav')
 */
import BsMixin from './mixin/bsMixin.js';
export default{
  mixins:[BsMixin],
  data(){
    return {
      tag:'nav',
      classes:{}
    }
  }
}
</script>
