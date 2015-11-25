/**
 * label
 * tag:VLabel
 * @type {String}
 * @description
 * 可以添加跳转链接，自动转换a标签
 * 不能使用系统已存在的label标签调用，否则不会成功，默认情况请使用：
 * import VLabel from 'label.vue';
 */
<style lang="stylus">
.label
  a
    color:#fff
</style>
<template lang="jade">
div.container
  h2  {{title}}
  div.label-inline
    h4  Label标签
    v-label(v-for='lab in styleList',v-bind:type="lab",track-by="$index",href='www.baidu.com') {{lab}}
    h4 Button按钮
    button(v-for='btn in styleList',v-bind:bs-style="btn",type='button',@click='clickButton',track-by="$index") {{btn}}
    h4 按钮组
    button-group
      button left
      button center
      button right
    h4 下拉框
    dropdown-button(title='下拉框',v-bind:dropup='true')
      menu-item(v-for='lk in linkList',v-bind:href='lk.url')  {{lk.name}}
    split-button(title='分裂下拉按钮',bs-style='primary')
      menu-item(v-for='lk in linkList',v-bind:href='lk.url')  {{lk.name}}
</template>
<script>
import VLabel from './src/label.vue';
import Button from './src/button.vue';
import ButtonGroup from './src/buttonGroup.vue';
import DropdownButton from './src/dropdownButton.vue';
import MenuItem from './src/menuitem.vue';
import SplitButton from './src/splitButton.vue';
export default{
    data(){
      return {
        title:"welcome vuebootstrap!",
        styleList:['default',"primary","success","info","warning","danger"],
        linkList:[{name:'link1',url:'#'},{name:'link2',url:'http://www.baidu.com'}]
      }
    },
    methods:{
      clickButton(){
        alert('this is button');
      }
    },
    components:{
      VLabel,
      MenuItem,
      Button,
      ButtonGroup,
      DropdownButton,
      SplitButton
    }


}
</script>
