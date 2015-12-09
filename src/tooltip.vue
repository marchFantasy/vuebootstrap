<style lang='stylus'>
.tooltip
  display:none
</style>
<template lang="jade">
div(v-bind:class='classes',role='tooltip')
  div.tooltip-arrow
  div.tooltip-inner
    slot
</template>

<script>
/**
 * tooltip
 * tag:Tooltip
 * @param placement 位置
 * @param show 显示
 */
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
