<template lang='jade'>
div.carousel.slide#carousel
  ol.carousel-indicators(v-if='indicators')
    li(v-for='i in count',v-bind:class='{"active":$index===activeIndex}')
  div.carousel-inner(@mouseover='pause',@mouseout='play')
    slot
  a.left.carousel-control(v-if='controls',@click='prev')
    span.glyphicon.glyphicon-chevron-left
    span.sr-only Previous
  a.right.carousel-control(v-if='controls',@click='next')
    span.glyphicon.glyphicon-chevron-right
    span.sr-only Next
</template>
<script>
/**
 * carousel：跑马灯
 * tag:Carousel
 * @param interval 间隔时间
 * @param controls 控制切换上一个/下一个
 * @param indicators 显示锚点
 * @param pauseOnHover hover时暂停
 * @param slide 自动轮播
 * @description
 *
 */
import Vue from 'vue';
import TransitionEvents from './util/transitionEvents.js';
export default{
  props:{
    interval:{
      type:Number,
      default:3000
    },
    controls:{
      type:Boolean,
      default:true
    },
    indicators:{
      type:Boolean,
      default:true
    },
    pauseOnHover:{
      type:Boolean,
      default:true
    },
    slide:{
      type:Boolean,
      default:true
    }
  },
  data(){
    return{
      activeIndex:0,
      timeout:null,
      isPause:false,
      count:0
    }
  },
  ready(){
    let self = this;
    if(this.$children.length < 1)return;
    let $children = this.$children;
    $children.forEach((child,index)=>{
      if(index === self.activeIndex){
        child.setActive();
      }
      //统计图片数
      self.count++;
    });
    this.waitForNext();
  },
  computed:{
    items(){
      return this.$children;
    }
  },
  methods:{
    waitForNext(){
      if(!this.isPause && this.slide && this.count > 0){
        this.timeout = setTimeout(this.next,this.interval);
      }
    },
    prev(e){
      if(e){
        e.preventDefault();
      }
      let index = this.activeIndex - 1;
      if(index < 0){
        index = this.count-1;
      }
      this.handleSelect(index,'prev');
    },
    next(e){
      if(e){
        e.preventDefault();
      }

      let index = this.activeIndex + 1;
      if(index >= this.count){
        index = 0;
      }
      this.handleSelect(index,'next');
    },
    pause(){
      if(this.isPause)return;
      this.isPause = true;
      if(this.timeout)clearTimeout(this.timeout);
    },
    play(){
      this.isPause =false;
      this.waitForNext();
    },
    getDirection(type){

      return type === 'prev' ? 'right' : 'left';
    },
    handleSelect(index,type){
      clearTimeout(this.timeout);
      let self = this;
      let prevIndex = self.activeIndex;
      let idirection = self.getDirection(type);

      let prevEl = self.items[prevIndex];
      let activeEl = self.items[index];

      activeEl.AnimatingIn(type);
      //forece reflow
      Vue.nextTick(()=>{
        activeEl.$el.offsetWidth;
        prevEl.animating(idirection);
        activeEl.animating(idirection);
      });

       TransitionEvents.addEndEventListener(
         prevEl.$el,
         ()=>{
           if(prevEl){
             prevEl.animateOuted();
             prevEl = null;
           }

         }
       );
       TransitionEvents.addEndEventListener(
         activeEl.$el,
         ()=>{
           if(activeEl){
             activeEl.animatedIn(type,idirection);
             self.waitForNext();
             activeEl = null;
           }
         }
       );

       self.activeIndex = index;

    }
  },
  destroyed(){
    clearTimeout(this.timeout);
  }
}

</script>
