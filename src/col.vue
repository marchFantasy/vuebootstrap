<template lang='jade'>
div(v-bind:class='classes')
  slot
</template>
<script>
/**
 * col
 * tag：column
 * @description
 *
 * 栅格系统：列,不要直接声明：col
 * import Column from './column';
 */
export default{
  props:{
    xs:{
      type:String
    },
    sm:{
      type:String
    },
    md:{
      type:String
    },
    lg:{
      type:String
    }
  },
  data(){
    return{
      classes:{}
    }
  },
  created(){
    if(!!this.xs){
      this.classes['col-xs-'+this.xs] = true;
    }
    if(!!this.sm){
      this.classes['col-sm-'+this.sm] = true;
    }
    if(!!this.md){
      this.classes['col-md-'+this.md] = true;
    }
    if(!!this.lg){
      this.classes['col-lg-'+this.lg] = true;
    }
  }
}
</script>
