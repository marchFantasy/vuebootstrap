<template lang="jade">
div
  nav(is='nav',bs-style='tabs')
    nav-item(v-for='item in tabList',v-bind:class="{'active':activeIndex==$index,'disabled':disabledList.indexOf($index)>-1}",@click='switchTab($index)')
      {{item.title}}
  div.tab-content(v-el:items)
    slot
</template>
<script>
/**
 * tab选项卡
 * tag:Tab
 * @param onSelect 标签点击事件
 * @description
 * 编译结束和 $el 第一次插入文档之后调用，遍历content内部的tab项，
 * 根据name属性，动态添加标签导航列表，并根据序列号（$index）切换
 * 选项卡
 */
import Vue from 'vue';
import Nav from './nav.vue';
import NavItem from './navItem.vue';
import TabItem from './tabItem.vue';

export default {
  props:{
    onSelect:{
      type:Function,
      twoWay:true
    }
  },
  data(){
    return{
      tabList:[],
      count:0,
      activeIndex:0,
      disabledList:[]
    }
  },
  ready(){
    if(this.tabList[this.activeIndex]){
      this.tabList[this.activeIndex].setActive();
      this.tabList[this.activeIndex].animateIn();
    }
  },
  methods:{
    switchTab(activeIndex){
      let self = this;
      if(activeIndex === self.activeIndex) return;
      if(self.disabledList.indexOf(activeIndex) > -1)return;

      if(this.onSelect){
        this.onSelect(self.tabList[activeIndex]);
      }
      let prevIndex = self.activeIndex;
      self.tabList[activeIndex].setActive();

      self.tabList[prevIndex].animateOut();

      Vue.nextTick(()=>{
        //reflow
          self.tabList[activeIndex].$el.offsetWidth;
          self.tabList[activeIndex].animateIn();
      })

      this.activeIndex = activeIndex;

    },
    addItem(vItem){
      if(vItem.disabled){
        this.disabledList.push(this.count)
      }
      this.tabList.push(vItem);
      this.count++;
    }
  },
  components:{
    Nav,
    NavItem,
    TabItem
  }
}
</script>
