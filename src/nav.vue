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
 * @param bsStyle {String}
 * @param justified {Boolean}
 * @param stacked {Boolean}
 */
import BsMixin from './mixin/bsMixin.js';
export default{
  mixins:[BsMixin],
  props:{
    justified:{
      type:Boolean,
      default:false
    },
    stacked:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      tag:'nav',
      classes:{}
    }
  },
  created(){
    if(this.justified){
      this.classes[this.tag+'-justified'] = true;
    }
    if(this.stacked){
      this.classes[this.tag+"-stacked"] = true;
    }
  }
}
</script>
