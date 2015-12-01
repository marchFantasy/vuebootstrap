<template lang="jade">
div.tab-pane.fade(v-bind:class='classes')
  slot
</template>
<script>
/**
 * tabitem选项卡
 * tag:TabItem
 * @param disabled 不可选
 * @param title 标题
 * @description
 * 这里data属性好像没有什么用，主要是父组件操作
 */


export default{
  props:{
    disabled:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      validator:(value)=>{
        return value.trim() != ''
      }
    }
  },
  data(){
    return{
      classes:[]
    }
  },

  created(){
    this.$parent.addItem(this);
  },
  methods:{
    setActive(){
      this.classes.push('active');
    },
    animateIn(){
      this.classes.push('in');
    },
    animateOut(){
      this.classes.splice(0,2);
      this.classes = [];
    }
  }
}
</script>
