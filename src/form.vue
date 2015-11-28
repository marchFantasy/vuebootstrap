<template lang='jade'>
form(v-bind:class='classes',v-el:form)
  div.form-group
</template>
<script>
/**
 * form 表单
 * tag:Form
 * @param bs-style inline，horizontal
 * @description
 * import Form from './form.vue'
 */
export default{
  props:{
    bsStyle:{
      type:String
    }
  },
  data(){
    return {
      classes:{
        form:true
      }
    }
  },
  created(){
    if(this.bsStyle){
      this.classes['form-'+this.bsStyle] = true;
    }
  },
  beforeCompile(){
    console.log(this);
  },
  ready(){
    console.log(this.$els.form);
    let children = this.$els.form.children;
    if(!this.bsStyle){
      //default
      let l = children.length;
      let i = 0;
      while(i < l){
        let label = document.createElement('label');
        label.innerText = children[i].getAttribute('label');

        this.$els.form.insertBefore(label,children[i]);
        i++;
      }
    }else if(this.bsStyle === 'horizontal'){

    }
  }
}
</script>
