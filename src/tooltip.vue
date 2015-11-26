/**
 * tooltip
 * tag:Tooltip
 * @param placement 位置
 */
<template lang="jade">
div.tooltip(v-bind:class='classes',role='tooltip')
  div.tooltip-arrow
  div.tooltip-inner
    slot
</template>

<script>
  export default {
    props:{
      placement:{
        type:String,
        default:'top'
      },
      show:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        classes:{'fade':true}
      }
    },
    created(){

      this.classes[this.placement] = true;
      this.classes['in'] = this.show ? true : false;
    }
  }
</script>
