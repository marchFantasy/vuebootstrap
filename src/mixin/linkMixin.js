/**
 * 链接mixin
 */
module.exports = {
  props:{
    'href':{
      type:String,
      default:'javascript:;'
    },
    'target':{
      type:String,
      default:'_self'
    },
    'disabled':{
      type:Boolean,
      default:false
    }
  }
};
