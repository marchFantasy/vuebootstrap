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
   * tag:panel
   * @param bsStyle 风格
   * import Panel from './panel.vue';
   */
import BsMixin from './mixin/bsMixin.js';
  export default{
    mixins:[BsMixin],
    data(){
      return{
        tag:'panel',
        classes:{}
      }
    }
  }
</script>
