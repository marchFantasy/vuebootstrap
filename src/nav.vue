/**
 * nav
 * tag:VNav
 * @description
 * 调用的时候切勿之间使用nav标签，会自动调用系统标签，统一前缀vnav
 */

<template lang='jade'>
ul.nav(v-bind:class='classes')
  slot
</template>
<script>

export default{
  props:{
    bsStyle:{
      type:String,
      default:'tabs'
    }
  },
  data(){
    return {
      classes:{nav:true}
    }
  },
  created(){
    this.classes['nav-'+this.bsStyle] = true;
  }
}
</script>
