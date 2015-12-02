<style lang='stylus'>
.tooltip-wrap
  display:inline-block
  position:relative
</style>

<template lang="jade">
div.tooltip-wrap
  slot
  tooltip(
    v-if='show',
    v-ref:tooltip,
    v-bind:style='tipPosition',
    v-bind:placement='placement',
    ) {{content}}
</template>
<script>
/**
 * tooltipTrigger
 * tag:tooltipTrigger
 * @param trigger 触发类型
 * @param placement 位置
 * @description
 */
import Tooltip from './tooltip.vue';
import TipTriggerMixin from './mixin/tipTriggerMixin.js';
export default{
  mixins:[TipTriggerMixin],
  data(){
    return{
      tag:"tooltip"
    }
  },
  components:{
    Tooltip
  }

}
</script>
