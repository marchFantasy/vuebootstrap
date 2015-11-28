<template lang='jade'>
  input.form-control(
    v-bind:type='type',
    v-bind:label='label',
    v-bind:placeholder='placeholder',
    v-model='value')
</template>
<script>
/**
 * input 输入框
 * tag:input
 * @description
 * import Input from './input.vue';
 */
export default{
  props:{
    type:{
      type:String,
      default:'text'
    },
    placeholder:{
      type:String
    },
    label:{
      type:String
    },
    value:{
      type:String
    }
  }
}
</script>
