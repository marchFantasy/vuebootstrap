/**
 * tooltip
 * tag:Tooltip
 * @param placement 位置
 */
<template lang="jade">
div(v-bind:class='classes',role='tooltip')
  div.tooltip-arrow
  div.tooltip-inner
    slot
</template>

<script>
import TipMixin from './mixin/poptipMixin.js';
export default {
  mixins:[TipMixin],
  data(){
    return {
      tag:'tooltip'
    }
  }
}
</script>
