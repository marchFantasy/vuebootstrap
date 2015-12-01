<template lang='jade'>
div(v-bind:class='classes')
  slot
</template>
<script>
/**
 * alert
 * tag:alert
 * 警告框
 * @param bsStyle 
 * import Alert from './alert.vue';
 */

import BsMixin from './mixin/bsMixin.js';
export default{
  mixins:[BsMixin],
  data(){
    return{
      tag:'alert',
      classes:{}
    }
  }
}

</script>
