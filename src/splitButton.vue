/**
 * splitButton
 * tag:SplitButton
 * @param type {String}
 * @description
 * 可以添加跳转链接
 * 默认情况请使用：
 * import SplitButton from 'splitButton.vue';
 */

<template lang="jade">
button-group(v-bind:class='classes')

  button(v-bind:bs-style='bsStyle',v-bind:size='size')
    {{title}}
  button(@click='toggleOpen',class='dropdown-toggle',v-bind:bs-style='bsStyle',v-bind:size='size',data-toggle='dropdown',aria-haspopup='true',aria-expanded='false')
    span.caret
  ul.dropdown-menu
    slot
</template>
<script>
import ButtonGroup from './buttonGroup.vue';
import Button from './button.vue';
export default{
  props:{
    title:{
      type:String,
      required:true
    },
    bsStyle:{
      type:String,
      default:'default'
    },
    size:{
      type:String
    },
    dropup:{
      type:Boolean,
      default:false
    }
  },
  created(){
    if(this.dropup){
      this.classes = 'dropup';
    }
  },
  data(){
    return{
      open:false,
      classes:''
    }
  },
  methods:{
    toggleOpen(e){
      this.open = !this.open;
      this.classes = {dropup:this.dropup,open:this.open};
    }
  },
  components:{
    Button,
    ButtonGroup
  }
}
</script>
