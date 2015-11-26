/**
 * 下拉框按钮mixin
 */

var ButtonGroup = require('../buttonGroup.vue');
var Button = require('../button.vue');
var ButtonMixin = require('./buttonMixin.js');

module.exports = {
  mixins:[ButtonMixin],
  props:{
    title:{
      type:String,
      required:true
    },
    dropup:{
      type:Boolean,
      default:false
    }
  },
  created(){
    if(this.dropup){
      this.classes = 'dropup';
    }

  },
  data(){
    return{
      open:false,
      classes:''
    }
  },
  methods:{
    toggleOpen(e){
      this.open = !this.open;
      this.classes = {dropup:this.dropup,open:this.open};
    }
  },
  components:{
    Button,
    ButtonGroup
  }
}
