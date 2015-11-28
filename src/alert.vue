<template lang='jade'>
div(v-bind:class='classes')
  slot
</template>
<script>
/**
 * alert
 * tag:Alert
 * 警告框
 * import Alert from './alert.vue';
 */
export default{
  props:{
    bsStyle:{
      type:String
    }
  },
  data(){
    return{
      classes:{
        alert:true
      }
    }
  },
  created(){
    this.classes['alert-'+this.bsStyle] = true;
  }
}

</script>
