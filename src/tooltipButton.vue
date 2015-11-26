/**
 * tooltipButton
 * tag:TooltipButton
 * @param trigger 触发类型
 * @param placement 位置
 * @description
 * 原来vue－loader，可以不用将模板包含在一个div（标签）内
 * 可以同时返回多个平级标签，赞！
 */
<template lang="jade">
button(v-bind:bs-style='bsStyle',v-bind:size='size',v-ref:button)
  slot
tooltip(v-if='show',v-bind:style='position',v-bind:placement='placement',v-bind:show='true') totop
</template>
<script>
import Vue from 'vue';
import Button from './button.vue';
import ButtonMixin from './mixin/buttonMixin.js';
import Tooltip from './tooltip.vue';

import elOffset from './util/elOffset.js';
export default{
  mixins:[ButtonMixin],
  props:{
    trigger:{
      type:String,
      default:'hover'
    },
    placement:{
      type:String,
      default:'top'
    }
  },
  data(){
    return{
      show:false,
      tooltip:null,
      position:{}
    }
  },
  ready(){
    let btnEl = this.$refs.button.$el;
    //let tipEl = this.$refs.tooltip.$el;

    //动态绑定事件
    switch(this.trigger){
      case 'hover':
        btnEl.addEventListener('mouseover',this.toggle);
        btnEl.addEventListener('mouseout',this.toggle);
        break;
      case 'click':
        btnEl.addEventListener('click',this.toggle);
        break;
      default:
        btnEl.addEventListener('focus',this.toggle);
        btnEl.addEventListener('blur',this.toggle);
    };
    let elset = new elOffset(btnEl);
    let elPosition = elset.getPosition();
    this.position = {
      left:elPosition.left+'px',
      top:(elPosition.top-elPosition.height)+'px'
    };
  },
  methods:{
    toggle(e){
      //let el = this.$refs.button.$el;
      this.show = !this.show;
    }
  },
  components:{
    Button,
    Tooltip
  }

}
</script>
