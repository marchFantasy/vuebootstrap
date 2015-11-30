<template lang='jade'>
div.item(v-bind:class="classes")
  slot
</template>
<script>
/**
 * carouselItem
 * tag:carousel-item
 */

export default {
  data(){
    return{
      type:'next',
      classes:[]
    }
  },

  methods:{
    setActive(){
      //this.isActive = true;
      this.classes.push('active');
    },
    AnimatingIn(type){
      //this.setActive();
      this.classes.push(type);
    },

    animating(direction){
      //if(this.type === 'next'){
        this.classes.push(direction);
      //}
    },
    animateOuted(){
      this.classes = [];
    },
    animatedIn(type,direction){
      this.classes.splice(0,2,'active');
    }

  }
}
</script>
