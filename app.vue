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
    split-button(title='分裂下拉按钮',bs-style='primary',v-on:click='clickButton')
      menu-item(v-for='lk in linkList',v-bind:href='lk.url')  {{lk.name}}
    h4 模态框
    button(@click='toggleModal',bs-style='warning') 运行模态框
    modal(v-bind:show.sync='showModal')
      div(slot='modal-header')
        span.close(type='button',aria-label='close',@click='closeModal')
          span(aria-hidden="true")
            &times;
        h4.modal-title  模态框
      div(slot='modal-body')
        p One fine body
      div(slot='modal-footer')
        button(@click='closeModal') 关闭
    h4 Tooltip
    div(v-bind:style="tooltipStyle")
      tooltip(placement='bottom',v-bind:show='true') tobottom
    h4 tooltip 按钮
    tooltip-button(bs-style='danger',trigger='click')  右边

    h4 选项卡
    tab
      tab-item(name='tab1') 123
      tab-item(name='tab2') 456
      tab-item(name='tab3',disabled) 789
</template>
<script>
import VLabel from './src/label.vue';
import Button from './src/button.vue';
import ButtonGroup from './src/buttonGroup.vue';
import DropdownButton from './src/dropdownButton.vue';
import MenuItem from './src/menuitem.vue';
import SplitButton from './src/splitButton.vue';

import Modal from './src/modal.vue';
import Tooltip from './src/tooltip.vue';
import TooltipButton from './src/tooltipButton.vue';

import Tab from './src/tab.vue';
import TabItem from './src/tabItem.vue';

export default{
    data(){
      return {
        title:"welcome vuebootstrap!",
        showModal:false,
        tooltipStyle:{position:'relative',height:'30px'},
        styleList:['default',"primary","success","info","warning","danger"],
        linkList:[{name:'link1',url:'#'},{name:'link2',url:'http://www.baidu.com'}]
      }
    },
    methods:{
      clickButton(){
        alert('this is button');
      },
      toggleModal(){
        this.showModal = !this.showModal;
      },
      beforeClose(){
        alert('我要关闭了！');
      },
      closeModal(){
        this.toggleModal();
      }
    },
    components:{
      VLabel,
      MenuItem,
      Button,
      ButtonGroup,
      DropdownButton,
      SplitButton,
      Modal,
      Tooltip,
      TooltipButton,
      Tab,
      TabItem
    }


}
</script>
