/**
 * buttonGroup
 * tag:ButtonGroup
 * @param size  xs,sm,lg
 * @param algin vertical,justified
 * @description
 * 按钮组标签
 * 可以直接命名为ButtonGroup,默认情况请使用：
 * import ButtonGroup from 'buttonGroup.vue';
 */
<template lang="jade">
div(role='group',v-bind:class='classes')
  slot
</template>

<script>
export default{
  props:{
    'bsSize':{
      type:String
    },
    'align':{
      type:String
    }
  },
  computed:{
    bSize:function(){
      return this.bsSize || null
    },
    bAlign:function(){
      return this.align || null
    }
  },
  created(){
    if(this.bAlign){
      this.classes +=" btn-group-"+this.bAlign;
    }
    if(this.bSize){
      this.classes += " btn-group-"+this.bSize;
    }
  },
  data(){
    return{
      classes:"btn-group"
    }
  }
}

</script>
