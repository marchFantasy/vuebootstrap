/**
 * dropdownButton
 * tag:DropdownButton
 * @param title 按钮名称
 * @param size xs,sm,lg
 * @param bsStyle primary,success
 * @description
 * 可以添加跳转链接
 * 默认情况请使用：
 * import DropdownButton from 'dropdownButton.vue';
 * dropdown-button(title='下拉框',v-bind:dropup='true')
 */
<template lang="jade">
button-group(@click='toggleOpen',v-bind:class='classes')
  button(class='dropdown-toggle',
          v-bind:bs-style='bsStyle',
          v-bind:bs-size='bsSize',
          v-bind:disabled='disabled'
          data-toggle='dropdown',
          aria-haspopup='true',
          aria-expanded='false')
    slot(name="dropdown-title")
  ul.dropdown-menu
    slot(name="dropdown-menu")
</template>
<script>

  import MenuButtonMixin from './mixin/menuButtonMixin.js';
  export default{
    mixins:[MenuButtonMixin]
  }
</script>
