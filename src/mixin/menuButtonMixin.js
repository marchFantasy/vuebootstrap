/**
 * 下拉框按钮mixin
 */

var ButtonGroup = require('../buttonGroup.vue');
var Button = require('../button.vue');
var ButtonMixin = require('./buttonMixin.js');
var _ = require('vue').util;
module.exports = {
  mixins:[ButtonMixin],
  props:{
    dropup:{
      type:Boolean,
      default:false
    },
    dropdown:{
      type:Boolean,
      default:true
    },
    isShow:{
      type:Function
    },
    disabled:{
      type:Boolean,
      default:false
    }
  },
  created(){

    if(this.dropup){
      this.classes['dropup'] = true;
    }
    if(this.dropdown){
      this.classes['dropdown'] = false;
    }

  },
  ready(){
    let self = this;
    //失去焦点后隐藏
    _.on(window,"click",(e)=>{
      if(self.open && self.$el && !self.$el.nextSibling.contains(e.target)){
        self.toggleOpen();
      }
    });
  },
  beforeDestroy(){
    _.off(window,"click");
  },
  data(){
    return{
      open:false,
      classes:{'dropup':false,'dropdown':true,'open':false}
    }
  },
  methods:{
    toggleOpen(e){
      if(e)e.preventDefault();
      if(this.disabled)return;
      this.open = !this.open;
      this.classes['open'] = this.open;
      if(this.isShow){
        this.isShow(this.open);
      }
    },

  },
  components:{
    Button,
    ButtonGroup
  }
}
