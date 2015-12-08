<template lang='jade'>
div.progress
  div(v-bind:class='classes',role="progressbar",v-el:progressbar)
    slot
</template>
<script>
/**
 *
 */
import BsMixin from './mixin/bsMixin.js';
export default{
  mixins:[BsMixin],
  props:{
    bsStyle:{
      type:String,
      default:'primary'
    },
    progress:{
      type:Number,
      default:0,
      required:true
    },
    min:{
      type:Number,
      default:0
    },
    max:{
      type:Number,
      default:100
    },
    striped:{
      type:Boolean,
      default:false
    },
    animation:{
      type:Boolean,
      default:false
    }
  },
  created(){
    //条纹效果
    if(this.striped){
      this.classes[this.tag+'-striped'] = true;
    }
    if(this.animation){
      this.classes['active'] = true;
    }
  },
  ready(){

    this.progressing();
  },
  computed:{
    beProgress:{
      get(){
        return this.progress;
      },
      set(val){
          this.$els.progressbar.style['width']=val+"%";
      }
    }
  },
  data(){
    return {
      tag:'progress-bar',
      classes:{},
      progressStyle:{}
    }
  },
  methods:{
    progressing(){
      this.beProgress = this.progress > this.max ? this.max :
                        this.progress < this.min ? this.min :
                        this.progress;
    }
  },
  watch:{
    progress(val){
      this.progressing();
    }
  }
}
</script>
