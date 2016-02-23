<style lang="stylus">
  .modal-dialog
    z-index:1100
</style>
<template lang="jade">
div.modal.fade(v-bind:class='modalClasses')
  overlay(v-bind:show='isShow')
  div(v-bind:class='dialogClasses')
    div.modal-content
      div.modal-header
        slot(name='modal-header')
      div.modal-body
        slot(name='modal-body')
      div.modal-footer
        slot(name='modal-footer')
</template>

<script>
/**
 * 模态框组件
 * @param title  标题
 * @param show  显示/隐藏
 * @param backdrop 包含遮盖层
 * @param size  大小
 * @param onBeforeShow 在显示之前执行的操作
 * @param onAfterShow 在显示之后执行的操作
 * @param onBeforeHide  隐藏模态框之前回调(保存按钮执行此次操作)
 * @param onAfterHide 隐藏模态框之后回调(保存按钮执行此次操作)
 * @description
 * 模态框组件，包含顶部，内容和底部三个区域
 */
  import Overlay from './overlay.vue';
  const Modal = {
    props:{
      title:{
        type:String,
        required:true
      },
      bsSize:{
        type:String
      },
      isShow:{
        type:Boolean,
        default:false
      },
      onBeforeShow:{
        type:Function
      },
      onAfterShow:{
        type:Function
      },
      onBeforeHide:{
        type:Function
      },
      onAfterHide:{
        type:Function
      }
    },
    data(){
      return {
        dialogClasses:{'modal-dialog':true},
        modalClasses:[]
      }
    },
    computed:{
      bSize(){
        return this.size || null;
      }
    },
    watch:{
      'isShow':function(bool){
          if(bool){
            //显示之前回调
            if(this.onBeforeShow){
              this.onBeforeShow();
            }
            this.showin();
            //显示后回调
            if(this.onAfterShow){
              this.onAfterShow();
            }
          }else{
            //隐藏之前回调
            if(this.onBeforeHide){
              this.onBeforeHide();
            }
            this.showout();
            //隐藏之后回调
            if(this.onAfterHide){
              this.onAfterHide();
            }
          }
      }
    },
    created(){
      if(this.bSize){
        this.dialogClasses['modal-'+this.bSize] = this.bSize;
      }
    },
    methods:{
      showin(){
        let self = this;
        self.modalClasses.push("show");
        //动画效果需要延迟
        setTimeout(()=>{
          self.modalClasses.push("in");
        })

      },
      showout(){
        this.$set("modalClasses",[]);
      }
    },
    components:{
      Overlay
    }
  }

  export default Modal;
</script>
