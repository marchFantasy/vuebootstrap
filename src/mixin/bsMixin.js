module.exports = {
  props:{
    bsStyle:{
      type:String,
      default:'default'
    },
    bsSize:{
      type:String,
      default:null
    }
  },
  created:function(){
    var character = '-';
    if(this.tag){
      //默认添加tag class
      this.classes[this.tag] = true;
      //添加style，例如：btn-primary
      if(this.bsStyle){
        this.classes[this.tag+character+this.bsStyle] = true;
      }
      //大小，例如：btn-sm
      if(this.bsSize){
        this.classes[this.tag+character+this.bsSize] = true;
      }

    }
  }
};
