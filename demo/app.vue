
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
    dropdown-button(v-bind:dropup='true',v-bind:is-show="isShow")
      span(slot="dropdown-title")
        | 下拉框
        i.caret
      menu-item(v-for='lk in linkList',
                v-bind:href='lk.url',
                v-bind:on-click="clickButton",
                v-bind:header="true",
                slot="dropdown-menu")  {{lk.name}}
      menu-item(v-bind:divider="true")
    split-button(title='分裂下拉按钮',bs-style='primary',v-on:click='clickButton')
      menu-item(v-for='lk in linkList',v-bind:href='lk.url')  {{lk.name}}
    h4 导航
    nav(is="nav",bs-style="pills",v-bind:justified="true")
      nav-item(v-for='lk in linkList',
               v-bind:href='lk.url',
               v-bind:active="lk.active",
               v-bind:disabled="lk.disabled",
               v-bind:on-click='clickButton') {{lk.name}}
    h4 模态框
    button(@click='toggleModal',bs-style='warning') 运行模态框
    //v-bind:on-before-hide="beforeClose"
    modal(v-bind:is-show='showModal',bs-size="lg",v-bind:on-before-hide="beforeClose")
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
    tooltip-trigger(trigger='click',placement='bottom',content="弹出框内容呢弹出框内容呢弹出框内容呢")
      button(bs-style='danger') 提示框
    h4 popver弹出框
    div(v-bind:style='popoverStyle')
      popover(title='标题',placement='top',v-bind:show='true')
        弹出框内容呢弹出框内容呢弹出框内容呢
    popover-trigger(trigger='click',placement='right',title='title',content="啊圣诞节快乐家")
      button(bs-style='default') popover弹出来
    h4 选项卡
    tab(v-bind:on-select='clickTab')
      tab-item(title='tab1') 123
      tab-item(title='tab2') 456
      tab-item(title='tab3',v-bind:disabled='true') 789
    h4 分页组件
    pagination(v-bind:active-page='activePage ',v-bind:items="pages",v-bind:on-select='selectPage')
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
    div
      carousel(style='width:815px;')
        carousel-item
          img(src='../resources/carousel1.png')
        carousel-item
          img(src='../resources/carousel2.png')
        carousel-item
          img(src='../resources/carousel3.png')
    h4 表单控件
    form(is='form',bs-style='horizontal',v-bind:layout='{sm:"3,9",md:"2,8"}')
      form-input(type=text,label='输入框1',placeholder='输入框12',v-bind:model.sync='value')
    {{value}}
    h4 面包屑
    breadcrumb
      breadcrumb-item(href='#').
        home
      breadcrumb-item(href='#').
        library
      breadcrumb-item(v-bind:active='true').
        point
    h4 缩略图
    row
      column(md='3',sm='12')
        thumbnail(
                src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUxODA4Yjk1MDQgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTE4MDhiOTUwNCI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS40Ij4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+',
                alt='示例图')
                h3 标题
                p 描述信息在这里
                p
                  button(bs-style='primary') 按钮
                  button 按钮
      column(md='3',sm='12')
        thumbnail(
                src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUxODA4Yjk1MDQgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTE4MDhiOTUwNCI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS40Ij4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+',
                alt='示例图')
                h3 标题
                p 描述信息在这里
                p
                  button(bs-style='primary') 按钮
                  button 按钮
      column(md='3',sm='12')
        thumbnail(
                src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjQyIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDI0MiAyMDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzEwMCV4MjAwCkNyZWF0ZWQgd2l0aCBIb2xkZXIuanMgMi42LjAuCkxlYXJuIG1vcmUgYXQgaHR0cDovL2hvbGRlcmpzLmNvbQooYykgMjAxMi0yMDE1IEl2YW4gTWFsb3BpbnNreSAtIGh0dHA6Ly9pbXNreS5jbwotLT48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwhW0NEQVRBWyNob2xkZXJfMTUxODA4Yjk1MDQgdGV4dCB7IGZpbGw6I0FBQUFBQTtmb250LXdlaWdodDpib2xkO2ZvbnQtZmFtaWx5OkFyaWFsLCBIZWx2ZXRpY2EsIE9wZW4gU2Fucywgc2Fucy1zZXJpZiwgbW9ub3NwYWNlO2ZvbnQtc2l6ZToxMnB0IH0gXV0+PC9zdHlsZT48L2RlZnM+PGcgaWQ9ImhvbGRlcl8xNTE4MDhiOTUwNCI+PHJlY3Qgd2lkdGg9IjI0MiIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFRUVFRUUiLz48Zz48dGV4dCB4PSI4OS44NTkzNzUiIHk9IjEwNS40Ij4yNDJ4MjAwPC90ZXh0PjwvZz48L2c+PC9zdmc+',
                alt='示例图')
                h3 标题
                p 描述信息在这里
                p
                  button(bs-style='primary') 按钮
                  button 按钮
    h4 进度条
    Progressbar(v-bind:progress='progress',bs-style='danger',v-bind:striped='true')
      {{progress}}
    button(@click='addProgress') 进度变化点击我
</template>
<script>
/**
 * app.vue 示例代码
 * 可以查看源码，基本了解控件的运用
 */
import Label from '../src/label.vue';
import Button from '../src/button.vue';
import ButtonGroup from '../src/buttonGroup.vue';
import DropdownButton from '../src/dropdownButton.vue';
import Nav from '../src/nav.vue';
import NavItem from '../src/navItem.vue';
import MenuItem from '../src/menuitem.vue';
import SplitButton from '../src/splitButton.vue';

import Modal from '../src/modal.vue';
import Tooltip from '../src/tooltip.vue';
import TooltipTrigger from '../src/tooltipTrigger.vue';
import Popover from '../src/popover.vue';
import PopoverTrigger from '../src/popoverTrigger.vue';

import Tab from '../src/tab.vue';
import TabItem from '../src/tabItem.vue';

import Pagination from '../src/pagination.vue';
import Row from '../src/row.vue';
import Column from '../src/col.vue';
import Panel from '../src/panel.vue';
import Alert from '../src/alert.vue';

import Carousel from '../src/carousel.vue';
import CarouselItem from '../src/carouselItem.vue';

import Form from '../src/form.vue';
import FormInput from '../src/formInput.vue';

import Breadcrumb from '../src/breadcrumb.vue';
import BreadcrumbItem from '../src/breadcrumbItem.vue';
import Thumbnail from '../src/thumbnail.vue';
import Progressbar from '../src/progressbar.vue';
export default{
    data(){
      return {
        title:"welcome vuebootstrap!",
        showModal:false,
        tooltipStyle:{position:'relative',height:'30px'},
        popoverStyle:{position:'relative',height:'100px'},
        styleList:['default',"primary","success","info","warning","danger"],
        linkList:[{name:'link1',url:'#',active:false,disabled:true},{name:'link2',url:'http://www.baidu.com'}],
        value:"form1",
        progress:12,
        activePage:6,
        pages:5
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
        //alert(pager.name);
        if(pager.num == "next"){
          this.activePage = 10 >= (this.activePage+1) ? this.activePage+1:this.activePage;
        }else if(pager.num == "prev"){
          this.activePage = this.activePage < 1 ? this.activePage : this.activePage - 1;
        }else{
          this.activePage = pager.num;
        }
      },
      clickTab(tab){
        alert(tab.title)
      },
      addProgress(){
        this.progress += 2;
      },
      isShow(isShow){
        if(isShow){
          alert("open")
        }else{
          alert("hide");
        }
      }
    },
    ready(){
      var self = this;
      setTimeout(()=>{
        self.pages = 10;
      },2000);
    },
    components:{
      Label,
      MenuItem,
      Nav,
      NavItem,
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
      Breadcrumb,
      BreadcrumbItem,
      Thumbnail,
      Progressbar
    }


}
</script>
