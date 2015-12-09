<style lang='stylus'>
.tooltip-wrap
  display:inline-block
  position:relative
</style>

<template lang="jade">
div.tooltip-wrap
  slot
tooltip(
  v-ref:tooltip,
  v-bind:style='tipPosition',
  v-bind:placement='placement',
  v-bind:show='show'
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
