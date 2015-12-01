<template lang='jade'>
form(v-bind:class='classes')
  slot

</template>
<script>
/**
 * form
 * tag:form
 * @param bsStyle inline,horizontal
 * @param layout horizontal时要求布局
 * layout.sm,laout.md,layout.xs
 * import form from './form.vue';
 *
 * <template lang='jade'>
 * 	form(is='form',v-bind:layout='{sm:"2,10",md:"2,10"}')
 * </template>
 */
import BsMixin from './mixin/bsMixin.js';

export default{
  mixins:[BsMixin],
  props:{
    layout:{
      type:Object
    }
  },
  data(){
    return {
      tag:'form',
      classes:{}
    }
  },
  computed:{
    formInputs(){
      return this.$children;
    }
  },
  ready(){
    if(this.bsStyle === 'horizontal'){
      let children = this.formInputs;
      let layout = this.layout;
      let lblClass = [],iptClass = [];

      if(layout){
        if(layout.md){
          lblClass.push("col-md-"+layout.md.split(',')[0]);
          iptClass.push("col-md-"+layout.md.split(',')[1]);
        }
        if(layout.sm){
          lblClass.push("col-sm-"+layout.sm.split(',')[0]);
          iptClass.push("col-sm-"+layout.sm.split(',')[1]);
        }
        if(layout.xs){
          lblClass.push("col-xs-"+layout.xs.split(',')[0]);
          iptClass.push("col-xs-"+layout.xs.split(',')[1]);
        }
      }
      lblClass.push('control-label');
      children.forEach((child)=>{
        child.setHorizontalLayout && child.setHorizontalLayout({lblClass,iptClass});
      })
    }
  }
}
</script>
