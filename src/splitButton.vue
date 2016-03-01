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
  button(v-bind:bs-style='bsStyle',
        v-bind:bs-size='bsSize',
        @click='_handleClick',
        v-bind:disabled='disabled')
    {{title}}
  button(@click='toggleOpen',
          class='dropdown-toggle',
          v-bind:bs-style='bsStyle',
          v-bind:bs-size='bsSize',
          v-bind:disabled='disabled',
          data-toggle='dropdown',
          aria-haspopup='true',
          aria-expanded='false')
    span.caret
  ul.dropdown-menu
    slot
</template>
<script>
import MenuButtonMixin from './mixin/menuButtonMixin.js';
export default{
  mixins:[MenuButtonMixin],
  props:{
    title:{
      type:String,
      required:true
    }
  },
  methods:{
    _handleClick(e){
      this.$dispatch('click',e);
    }
  }
}
</script>
