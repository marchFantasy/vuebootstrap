<template lang='jade'>
div(v-bind:class='classes')
  div.panel-heading
    slot(name='panel-header')
  div.panel-body
    slot(name='panel-body')
</template>
<script>
  /**
   * panel
   * tag:Panel
   * import Panel from './panel.vue';
   */

  export default{
    props:{
      bsStyle:{
        type:String,
        default:'default'
      }
    },
    data(){
      return{
        classes:{
          'panel':true,
        }
      }
    },
    created(){
      this.classes['panel-'+this.bsStyle] = true;
    }
  }
</script>
