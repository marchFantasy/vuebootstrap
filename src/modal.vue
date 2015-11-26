/**
 * 模态框组件
 * @param title  标题
 * @param show  显示/隐藏
 * @param backdrop 包含遮盖层
 * @param size  大小
 * @param onHide  隐藏模态框后回调(关闭和保存按钮都执行此次操作)
 * @description
 * 模态框组件，包含顶部，内容和底部三个区域
 */
<style lang="stylus">
  .modal-dialog
    z-index:1100
</style>
<template lang="jade">
div.modal.fade(v-bind:class='isIn')
  Overlay(v-bind:show='show')
  div(v-bind:class='classes')
    div.modal-content
      div.modal-header
        slot(name='modal-header')
      div.modal-body
        slot(name='modal-body')
      div.modal-footer
        slot(name='modal-footer')
</template>

<script>
  import Button from './button.vue';
  import Overlay from './overlay.vue';
  const Modal = {
    props:{
      title:{
        type:String,
        required:true
      },
      size:{
        type:String
      },
      show:{
        twoWay:true,
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        classes:{'modal-dialog':true},
        isIn:{'in':false,'show':false}
      }
    },
    computed:{
      bSize(){
        return this.size || null;
      }
    },
    watch:{
      'show':function(bool){
          this.isIn['in'] = bool;
          this.isIn['show'] = bool;
      }
    },
    created(){

      if(this.bSize){
        this.classes['modal-'+this.bSize] = this.bSize;
      }
    },
    components:{
      Button,
      Overlay
    }
  }

  export default Modal;
</script>
