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
    },
    dropdown:{
      type:Boolean,
      default:true
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
  data(){
    return{
      open:false,
      classes:{'dropup':false,'dropdown':true,'open':false}
    }
  },
  methods:{
    toggleOpen(e){
      this.open = !this.open;
      this.classes['open'] = this.open;
    }
  },
  components:{
    Button,
    ButtonGroup
  }
}
