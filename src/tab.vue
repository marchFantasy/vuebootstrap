/**
 * tab选项卡
 * tag:Tab
 * @param name 标签名
 * @description
 * 编译结束和 $el 第一次插入文档之后调用，遍历content内部的tab项，
 * 根据name属性，动态添加标签导航列表，并根据序列号（$index）切换
 * 选项卡
 */
<template lang="jade">
div
  v-nav
    nav-item(v-for='name in tabList',v-bind:class="{'active':activeKey==$index,'disabled':disabled.indexOf($index)>-1}",@click='switchTab($index)')
      {{name}}
  div.tab-content(v-el:items)
    slot
</template>
<script>
import VNav from './nav.vue';
import NavItem from './navItem.vue';
import TabItem from './tabItem.vue';

export default {
  data(){
    return{
      tabList:[],
      activeKey:0,
      disabled:[]
    }
  },
  ready(){
    let children = this.$els.items.children;
    //let children = this.$children;
    let l = children.length;
    for(let i = 0;i<l;i++){
      if(children[i].getAttribute('disabled') === 'disabled'){
        this.disabled.push(i);
      }
      if(i === this.activeKey){
        children[i].className += ' in active';
      }
      this.tabList.push(children[i].getAttribute('name'));
    }
  },
  methods:{
    switchTab(activeIndex){
      if(activeIndex === this.activeKey) return;
      if(this.disabled.indexOf(activeIndex) > -1)return;
      this.activeKey = activeIndex;
      let children = this.$els.items.children;
      //let children = this.$children;
      let l = children.length;
      for(let i = 0;i<l;i++){
        if(i === this.activeKey){
          children[i].className += ' active';
          //延迟会有动画效果哦
          setTimeout(()=>{
            children[i].className += ' in';
          },0);
        }else{
          children[i].className = children[i].className.replace(/\s?in|\s?active/g,'');
        }
      }
    }
  },
  components:{
    VNav,
    NavItem,
    TabItem
  }
}
</script>
