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
    label(is='label',v-for='lab in styleList',v-bind:bs-style="lab",track-by="$index",href='www.baidu.com') {{lab}}
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
    tooltip-trigger(trigger='click',placement='right',content="12312312321312")
      button(bs-style='danger') 提示框
    h4 popver弹出框
    div(v-bind:style='popoverStyle')
      popover(title='标题',placement='top',v-bind:show='true')
        弹出框内容呢弹出框内容呢弹出框内容呢
    popover-trigger(trigger='click',placement='right',title='title',content="撒大家快乐啊圣诞节快乐的撒娇哭\n手机打开")
      button(bs-style='default') popover弹出来
    h4 选项卡
    tab(v-bind:on-select='clickTab')
      tab-item(title='tab1') 123
      tab-item(title='tab2') 456
      tab-item(title='tab3',v-bind:disabled='true') 789
    h4 分页组件
    pagination(v-bind:active-page=6,v-bind:items=10,v-bind:on-select='selectPage')
    h4 栅格
    row
      column(xs='12',sm='4',md='4') 栅格系统1
      column(xs='12',sm='4',md='4') 栅格系统2
      column(xs='12',sm='4',md='4') 栅格系统3
    h4 面板
    panel(bs-style='info')
      div(slot='panel-header')
        标题
      div(slot='panel-body')
        内容
    h4 警告框
    alert(bs-style='warning')
      警告框
    h4 跑马灯
    test
    div
      carousel(style='width:815px;')
        carousel-item
          img(src='./resources/carousel1.png')
        carousel-item
          img(src='./resources/carousel2.png')
        carousel-item
          img(src='./resources/carousel3.png')
    h4 表单控件
    form(is='form',bs-style='horizontal',v-bind:layout='{sm:"3,9",md:"2,8"}')
      form-input(type=text,label='输入框1',placeholder='输入框12',:model.sync='value')
    {{value}}
</template>
<script>
import Label from './src/label.vue';
import Button from './src/button.vue';
import ButtonGroup from './src/buttonGroup.vue';
import DropdownButton from './src/dropdownButton.vue';
import MenuItem from './src/menuitem.vue';
import SplitButton from './src/splitButton.vue';

import Modal from './src/modal.vue';
import Tooltip from './src/tooltip.vue';
import TooltipTrigger from './src/tooltipTrigger.vue';
import Popover from './src/popover.vue';
import PopoverTrigger from './src/popoverTrigger.vue';

import Tab from './src/tab.vue';
import TabItem from './src/tabItem.vue';

import Pagination from './src/pagination.vue';
import Row from './src/row.vue';
import Column from './src/col.vue';
import Panel from './src/panel.vue';
import Alert from './src/alert.vue';

import Carousel from './src/carousel.vue';
import CarouselItem from './src/carouselItem.vue';

import Form from './src/form.vue';
import FormInput from './src/formInput.vue';

import Test from './src/test.vue';


export default{
    data(){
      return {
        title:"welcome vuebootstrap!",
        showModal:false,
        tooltipStyle:{position:'relative',height:'30px'},
        popoverStyle:{position:'relative',height:'100px'},
        styleList:['default',"primary","success","info","warning","danger"],
        linkList:[{name:'link1',url:'#'},{name:'link2',url:'http://www.baidu.com'}],
        value:"form1"
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
      },
      selectPage(pager){
        alert(pager.name);
      },
      clickTab(tab){
        alert(tab.title)
      }
    },
    components:{
      Label,
      MenuItem,
      Button,
      ButtonGroup,
      DropdownButton,
      SplitButton,
      Modal,
      Tooltip,
      TooltipTrigger,
      Tab,
      TabItem,
      Pagination,
      Row,
      Column,
      Panel,
      Alert,
      Carousel,
      CarouselItem,
      Form,
      FormInput,
      Popover,
      PopoverTrigger,
      Test
    }


}
</script>
