<template lang="jade">
div.form-group
  label(v-bind:class='lblClass')
    {{label}}
  div(v-if='horizontal',v-bind:class='iptClass')
    input.form-control(
      v-el:input,
      v-bind:type='type',
      v-bind:placeholder='placeholder',
      v-model='model'
    )
  input.form-control(
    v-if = '!horizontal',
    v-el:input,
    v-bind:type='type',
    v-bind:placeholder='placeholder',
    v-model='model'
  )
</template>
<script>
/**
 *
 */
export default{
  props:{
    type:{
      type:String,
      default:'text'
    },
    label:{
      type:String,
      required:true
    },
    placeholder:{
      type:String,
      default:''
    },
    model:{
      type:String,
      default:'',
      twoWay:true
    }
  },
  data(){
    return {
      lblClass:[],
      iptClass:[],
      horizontal:false
    }
  },
  methods:{
    setHorizontalLayout(classes){
      this.horizontal = true;
      this.lblClass = classes.lblClass;
      this.iptClass = classes.iptClass;
    }
  }
}
</script>
