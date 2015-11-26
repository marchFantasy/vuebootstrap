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
  button(v-bind:bs-style='bsStyle',v-bind:size='size',@click='_handleClick')
    {{title}}
  button(@click='toggleOpen',class='dropdown-toggle',v-bind:bs-style='bsStyle',v-bind:size='size',data-toggle='dropdown',aria-haspopup='true',aria-expanded='false')
    span.caret
  ul.dropdown-menu
    slot
</template>
<script>
import MenuButtonMixin from './mixin/menuButtonMixin.js';
export default{
  mixins:[MenuButtonMixin],
  methods:{
    _handleClick(e){
      this.$dispatch('click',e);
    }
  }
}
</script>
