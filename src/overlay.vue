/**
 * 遮盖层
 */

<template lang="jade">
div.modal-backdrop.fade(v-bind:class='isShow')
</template>
<script>
  export default{
    props:{
      show:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        isShow:{in:false}
      }
    },
    watch:{
      'show':function(bool){
        this.isShow['in'] = bool;
      }
    }
  }
</script>
